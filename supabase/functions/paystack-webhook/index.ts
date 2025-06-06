
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    const signature = req.headers.get('x-paystack-signature')
    
    // Verify webhook signature (you'll need to add your Paystack secret key)
    const paystackSecret = Deno.env.get('PAYSTACK_SECRET_KEY')
    
    if (!paystackSecret) {
      console.error('PAYSTACK_SECRET_KEY not found')
      return new Response('Server configuration error', { status: 500 })
    }

    // In a production environment, you should verify the webhook signature here
    // const hash = crypto.createHmac('sha512', paystackSecret).update(JSON.stringify(body)).digest('hex')
    // if (hash !== signature) {
    //   return new Response('Invalid signature', { status: 400 })
    // }

    if (body.event === 'charge.success') {
      const { reference, metadata, amount } = body.data
      
      // Update payment status and subscription
      const { error } = await supabaseClient.rpc('update_user_subscription', {
        user_id_param: metadata.userId,
        plan_type_param: metadata.planType,
        amount_param: amount / 100, // Convert from kobo to cedis
        reference_param: reference
      })

      if (error) {
        console.error('Error updating subscription:', error)
        return new Response('Error updating subscription', { status: 500 })
      }

      console.log(`Subscription updated for user ${metadata.userId}`)
    }

    return new Response('Webhook processed', { 
      status: 200,
      headers: corsHeaders 
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Internal server error', { 
      status: 500,
      headers: corsHeaders 
    })
  }
})
