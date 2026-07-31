import { supabase } from '../config/supabase.js';

// @desc    Submit a custom order / quote inquiry
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res, next) => {
  const { material, customText, width, height, color, estimatedPrice } = req.body;

  if (!material || !customText || !estimatedPrice) {
    res.status(400);
    return next(new Error('Please provide material type, custom text, and estimated price'));
  }

  try {
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        material,
        custom_text: customText,
        width: parseInt(width) || 0,
        height: parseInt(height) || 0,
        color: color || 'Default',
        estimated_price: parseFloat(estimatedPrice)
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Order specification submitted successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};
