import { supabase } from '../config/supabase.js';

// @desc    Get all posts with their comments
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res, next) => {
  try {
    // Fetch posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsError) throw postsError;

    // Fetch comments for all posts
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: true });

    if (commentsError) throw commentsError;

    // Map comments to posts
    const feed = posts.map(post => ({
      ...post,
      comments: comments.filter(c => c.post_id === post.id)
    }));

    res.status(200).json({ success: true, count: feed.length, data: feed });
  } catch (error) {
    next(error);
  }
};

// @desc    Handle upvote / downvote
// @route   POST /api/posts/:id/vote
// @access  Public
export const handleVote = async (req, res, next) => {
  const { id } = req.params;
  const { voteType } = req.body; // 'up', 'down', 'remove'
  
  try {
    // Get current post
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('upvotes')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    let increment = 0;
    if (voteType === 'up') increment = 1;
    else if (voteType === 'down') increment = -1;

    const newVoteCount = (post.upvotes || 0) + increment;

    // Update post votes
    const { data: updatedPost, error: updateError } = await supabase
      .from('posts')
      .update({ upvotes: newVoteCount })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to a post
// @route   POST /api/posts/:id/comments
// @access  Public
export const addComment = async (req, res, next) => {
  const { id } = req.params;
  const { author, text } = req.body;

  if (!text || !author) {
    res.status(400);
    return next(new Error('Please provide author name and comment text'));
  }

  try {
    const { data: comment, error } = await supabase
      .from('comments')
      .insert({ post_id: parseInt(id), author, text })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};
