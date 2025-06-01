
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { Search, Calendar, User, MessageCircle, Heart } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  author_id: string;
  profiles: { first_name: string; last_name: string } | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: { first_name: string; last_name: string } | null;
}

const Blog = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<any>(null);

  const categories = ['all', 'Courtship', 'Prayer', 'Marriage', 'Faith', 'Relationships'];

  useEffect(() => {
    loadPosts();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id (first_name, last_name)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (data) setPosts(data);
  };

  const loadComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('blog_comments')
      .select(`
        *,
        profiles:author_id (first_name, last_name)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (data) setComments(data);
  };

  const submitComment = async () => {
    if (!user || !selectedPost || !newComment.trim()) return;

    const { error } = await supabase
      .from('blog_comments')
      .insert({
        post_id: selectedPost.id,
        author_id: user.id,
        content: newComment
      });

    if (!error) {
      setNewComment('');
      loadComments(selectedPost.id);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-christian-navy dark:text-white mb-6">
              Faith-Centered Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover inspiring articles about Christian relationships, courtship, and building strong foundations in faith.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-surface-dark-elevated dark:border-gray-600"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-love-red hover:bg-love-red-dark text-white" 
                    : "border-love-red text-love-red hover:bg-love-red hover:text-white dark:border-love-red dark:text-love-red"
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-love-red/10 text-love-red border-love-red/20">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-playfair text-christian-navy dark:text-white hover:text-love-red transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      {post.profiles ? `${post.profiles.first_name} ${post.profiles.last_name}` : 'Anonymous'}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedPost(post);
                        loadComments(post.id);
                      }}
                      className="bg-growth-green hover:bg-growth-green-dark text-white"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-surface-dark-elevated max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge className="bg-love-red/10 text-love-red border-love-red/20 mb-2">
                    {selectedPost.category}
                  </Badge>
                  <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white">
                    {selectedPost.title}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </Button>
              </div>
              
              <div className="prose dark:prose-invert max-w-none mb-8">
                {selectedPost.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-christian-navy dark:text-white">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Comments ({comments.length})
                </h3>

                {/* Add Comment Form */}
                {user ? (
                  <div className="mb-6">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2 dark:bg-surface-dark dark:border-gray-600"
                    />
                    <Button 
                      onClick={submitComment}
                      className="bg-love-red hover:bg-love-red-dark text-white"
                    >
                      Post Comment
                    </Button>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-surface-dark rounded-lg">
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Please sign in to comment</p>
                    <Button onClick={() => handleOpenAuth('login')} size="sm">
                      Sign In
                    </Button>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 dark:bg-surface-dark p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-christian-navy dark:text-white">
                          {comment.profiles ? `${comment.profiles.first_name} ${comment.profiles.last_name}` : 'Anonymous'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default Blog;
