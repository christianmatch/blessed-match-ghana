
export const StatsSection = () => {
  const stats = [
    {
      number: '10,000+',
      label: 'Active Christian Singles',
      description: 'Verified believers seeking meaningful relationships'
    },
    {
      number: '500+',
      label: 'Success Stories',
      description: 'Couples who found love through our platform'
    },
    {
      number: '50+',
      label: 'Partner Churches',
      description: 'Churches across Ghana endorsing our mission'
    },
    {
      number: '98%',
      label: 'Member Satisfaction',
      description: 'Users who would recommend us to friends'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-christian-blue to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
            Transforming Lives Through Faith
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of Christian singles who have already discovered the blessing of faith-centered relationships.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-5xl lg:text-6xl font-bold mb-4 text-christian-gold">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2">
                {stat.label}
              </div>
              <div className="text-blue-100 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Bible Verse */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-2xl font-playfair italic mb-4">
              "He who finds a wife finds what is good and receives favor from the Lord."
            </p>
            <p className="text-blue-200">- Proverbs 18:22</p>
          </div>
        </div>
      </div>
    </section>
  );
};
