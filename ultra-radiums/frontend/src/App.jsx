import { useState } from 'react'
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaCommentAlt, 
  FaSearch, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaEnvelope, 
  FaExternalLinkAlt,
  FaClock
} from 'react-icons/fa'
import logoImg from './assets/logo.png'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('all') // 'all', 'estimator', 'gallery', 'contact'
  const [searchQuery, setSearchQuery] = useState('')
  const [showCommentInput, setShowCommentInput] = useState(null)
  
  // Create work post state
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostDesc, setNewPostDesc] = useState('')
  const [newPostCategory, setNewPostCategory] = useState('neon')
  const [newPostImage, setNewPostImage] = useState(null)

  // Custom board estimator state
  const [customText, setCustomText] = useState('ULTRA RADIUMS')
  const [material, setMaterial] = useState('neon') // 'neon', 'acrylic', 'wood', 'brass', 'rto'
  const [glowColor, setGlowColor] = useState('#0284c7') // Default light blue
  const [fontSize, setFontSize] = useState('neon-font') // 'neon-font', 'serif-font', 'mono-font', 'bold-font'
  const [boardWidth, setBoardWidth] = useState(24) // in inches
  const [boardHeight, setBoardHeight] = useState(12) // in inches

  // Bento state for posts (upvotes & simulated comments)
  const [posts, setPosts] = useState([
    {
      id: 1,
      category: 'neon',
      author: 'u/NeonEnthusiast',
      time: '4 hours ago',
      title: 'Custom Neon LED sign board! The glow is incredible.',
      description: 'Manufactured with high-grade flexible silicone neon strips on transparent acrylic backing. Very energy efficient and adds an incredible vibe to our storefront.',
      upvotes: 432,
      userVote: null,
      comments: [
        { author: 'u/CoffeeShopMysore', text: 'This looks stunning! How long did they take to deliver?', time: '3h ago' },
        { author: 'u/UltraRadiums_Official', text: 'Thank you! Typical turnaround is 3-5 days depending on complexity.', time: '2h ago' }
      ]
    },
    {
      id: 2,
      category: 'rto',
      author: 'u/RiderMysore',
      time: '7 hours ago',
      title: 'High-security RTO-approved German font plate for my new ride.',
      description: 'Standard plate with the blue IND hologram strip and laser embossed font. Kept it clean and compliant with the traffic guidelines.',
      upvotes: 219,
      userVote: null,
      comments: [
        { author: 'u/GearHead99', text: 'Is it official standard plates or styling?', time: '5h ago' }
      ]
    },
    {
      id: 3,
      category: 'nameplate',
      author: 'u/HomeDesignInspiration',
      time: '1 day ago',
      title: 'Teak-wood house name plate with warm brass lettering.',
      description: 'Ordered this for our new house. The CNC routing on teak wood coupled with heavy-duty polished brass letters feels extremely premium.',
      upvotes: 567,
      userVote: null,
      comments: [
        { author: 'u/BeautifulHomes', text: 'Absolute class. Fits perfectly with minimalist decor.', time: '18h ago' }
      ]
    },
    {
      id: 4,
      category: 'signage',
      author: 'u/CorporateOfficeMYS',
      time: '2 days ago',
      title: 'Brushed metal lobby 3D acrylic sign boards with backlighting.',
      description: 'Installed these acrylic solid block letters with LED halo illumination for our reception wall. Professional and very clean.',
      upvotes: 184,
      userVote: null,
      comments: []
    }
  ])

  // Estimator colors
  const colorOptions = [
    { name: 'Electric Blue', hex: '#0284c7' },
    { name: 'Sky Blue', hex: '#38bdf8' },
    { name: 'Teal Glow', hex: '#0d9488' },
    { name: 'Royal Navy', hex: '#1e3a8a' },
    { name: 'Sun Yellow', hex: '#eab308' },
    { name: 'Cool White', hex: '#f8fafc' }
  ]

  // Handle post voting
  const handleVote = (id, direction) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        let diff = 0
        let newVote = null
        if (direction === 'up') {
          if (post.userVote === 'up') {
            diff = -1
            newVote = null
          } else if (post.userVote === 'down') {
            diff = 2
            newVote = 'up'
          } else {
            diff = 1
            newVote = 'up'
          }
        } else {
          if (post.userVote === 'down') {
            diff = 1
            newVote = null
          } else if (post.userVote === 'up') {
            diff = -2
            newVote = 'down'
          } else {
            diff = -1
            newVote = 'down'
          }
        }
        return { ...post, upvotes: post.upvotes + diff, userVote: newVote }
      }
      return post
    }))
  }

  // Handle adding comments
  const handleAddComment = (postId, text) => {
    if (!text.trim()) return
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { author: 'u/GuestUser', text, time: 'Just now' }
          ]
        }
      }
      return post
    }))
    setShowCommentInput(null)
  }

  // Live price estimator calculation
  const getEstimatedPrice = () => {
    let baseRate = 12 // Rs per sq inch default
    if (material === 'neon') baseRate = 18
    if (material === 'acrylic') baseRate = 15
    if (material === 'wood') baseRate = 22
    if (material === 'brass') baseRate = 35
    if (material === 'rto') return 850 // Fixed standard price

    const sqInches = boardWidth * boardHeight
    return sqInches * baseRate
  }

  // WhatsApp order generator
  const getWhatsAppLink = () => {
    const textMsg = `Hello Ultra Radiums! I would like to query about a custom sign board with the following specifications:
- Material: ${material.toUpperCase()}
- Custom Text: "${customText}"
- Size: ${boardWidth}" x ${boardHeight}"
- Color/Style: ${glowColor} / ${fontSize.replace('-font', '')}
- Estimated Cost: Rs. ${getEstimatedPrice()}`

    return `https://wa.me/919483031324?text=${encodeURIComponent(textMsg)}`
  }

  // Filtered posts based on search bar
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle creating/posting new work
  const handleCreatePost = (e) => {
    e.preventDefault()
    if (!newPostTitle.trim()) return
    const newPostObj = {
      id: posts.length + 1,
      category: newPostCategory,
      author: 'u/sukanya4',
      time: 'Just now',
      title: newPostTitle,
      description: newPostDesc,
      image: newPostImage, // Include uploaded image Base64 URL
      upvotes: 1,
      userVote: 'up',
      comments: []
    }
    setPosts([newPostObj, ...posts])
    setNewPostTitle('')
    setNewPostDesc('')
    setNewPostImage(null) // Reset image upload state
  }

  return (
    <div className="bento-theme-wrapper">
      {/* Top Navbar */}
      <header className="bento-navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => setActiveTab('all')}>
            <img src={logoImg} alt="Ultra Radiums Logo" className="logo-img" />
            <span className="brand-text">Ultra Radiums</span>
          </div>

          <div className="navbar-search">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search signage categories, neon lights, nameplates..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setActiveTab('all')
              }}
            />
          </div>

          <div className="navbar-actions">
            <button 
              className={`nav-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Overview Grid
            </button>
            <button 
              className={`nav-btn ${activeTab === 'estimator' ? 'active' : ''}`}
              onClick={() => setActiveTab('estimator')}
            >
              Sandbox Previewer
            </button>
            <button 
              className={`nav-btn btn-cta`}
              onClick={() => setActiveTab('estimator')}
            >
              Estimate Order
            </button>
          </div>
        </div>
      </header>

      {/* Main Bento Layout */}
      <main className="bento-container container">
        
        {/* Bento Grid Wrapper */}
        <div className="bento-grid">
          
          {/* Block 1: Hero Welcome (Col-Span 2) */}
          <div className="bento-block welcome-block col-span-2">
            <div className="badge">⚡ Premium Signage & Branding Hub</div>
            <h1>Mysore's Premier Destination for Glowing Nameplates, LEDs & Graphic Boards</h1>
            <p className="welcome-desc">
              We engineer state-of-the-art custom <strong>Neon LED signs</strong>, 3D acrylic signage, vintage teak wood plates, and official RTO-approved number plates. Experience precision-cut craftsmanship designed to withstand weather and make your brand shine.
            </p>
            <div className="welcome-ctas">
              <button className="btn btn-primary" onClick={() => setActiveTab('estimator')}>
                Live Design Sandbox
              </button>
              <button className="btn btn-secondary" onClick={() => {
                const element = document.getElementById('contact-block');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>
                Contact Workshop
              </button>
            </div>
          </div>

          {/* Block 2: Quick Stats Block (Col-Span 1) */}
          <div className="bento-block stats-block">
            <h3>Workshop Profile</h3>
            <div className="bento-stat-item">
              <span className="stat-val">Mysore, IN</span>
              <span className="stat-lbl">Primary Region</span>
            </div>
            <div className="bento-stat-item">
              <span className="stat-val">15+ Years</span>
              <span className="stat-lbl">Industry Expertise</span>
            </div>
            <div className="bento-stat-item">
              <span className="stat-val">100% Quality</span>
              <span className="stat-lbl">Radium & Acrylic</span>
            </div>
          </div>

          {/* Block 3: Live Estimator Sandbox Sandbox Screen (Col-Span 2) */}
          <div className="bento-block col-span-2 estimator-block-preview">
            <div className="preview-header">
              <h3>Live Sandbox Design Canvas</h3>
              <span className="live-pill">● LIVE MODEL PREVIEW</span>
            </div>
            
            <div className={`bento-preview-canvas material-${material}`}>
              {material === 'neon' && (
                <div className="neon-preview-wrapper" style={{ textShadow: `0 0 8px ${glowColor}, 0 0 16px ${glowColor}, 0 0 32px ${glowColor}` }}>
                  <span className={`preview-text-rendered ${fontSize}`} style={{ color: glowColor }}>
                    {customText || 'WRITE SOMETHING'}
                  </span>
                </div>
              )}

              {material === 'acrylic' && (
                <div className="acrylic-preview-wrapper">
                  <span className={`preview-text-rendered ${fontSize} acrylic-letters`}>
                    {customText || 'WRITE SOMETHING'}
                  </span>
                </div>
              )}

              {material === 'wood' && (
                <div className="wood-preview-wrapper">
                  <div className="wood-plank">
                    <span className={`preview-text-rendered ${fontSize} wood-carved`}>
                      {customText || 'WRITE SOMETHING'}
                    </span>
                  </div>
                </div>
              )}

              {material === 'brass' && (
                <div className="brass-preview-wrapper">
                  <div className="brass-plank">
                    <span className={`preview-text-rendered ${fontSize} brass-etched`}>
                      {customText || 'WRITE SOMETHING'}
                    </span>
                  </div>
                </div>
              )}

              {material === 'rto' && (
                <div className="rto-preview-wrapper">
                  <div className="rto-ind-plate">
                    <div className="rto-ind-sidebar">
                      <div className="chakra-logo"></div>
                      <span className="ind-text">IND</span>
                    </div>
                    <span className="rto-plate-text-render font-mono">
                      {customText || 'KA 09 AB 1234'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="estimator-summary-panel">
              <div className="est-info-row">
                <span>Current Specs:</span>
                <strong>{material === 'rto' ? 'Standard RTO' : `${boardWidth}″ × ${boardHeight}″`}</strong>
              </div>
              <div className="est-info-row">
                <span>Material Selected:</span>
                <span className="est-badge">{material.toUpperCase()}</span>
              </div>
              <div className="est-info-row est-total">
                <span>Estimated Value:</span>
                <strong className="sky-highlight">₹{getEstimatedPrice().toLocaleString('en-IN')}*</strong>
              </div>
              <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="btn btn-primary btn-full mt-sm">
                <FaWhatsapp /> Send Order Query to WhatsApp
              </a>
            </div>
          </div>

          {/* Block 4: Estimator Control Panel (Col-Span 1) */}
          <div className="bento-block controls-block">
            <h3>Configuration Tools</h3>
            
            <div className="form-group-bento">
              <label>Custom Letters</label>
              <input 
                type="text" 
                value={customText} 
                onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                maxLength={25}
                className="bento-input"
              />
            </div>

            <div className="form-group-bento">
              <label>Material Type</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className="bento-select">
                <option value="neon">Silicone Neon LED (Glow)</option>
                <option value="acrylic">3D Laser Acrylic Lettering</option>
                <option value="wood">Vintage Teak Wood engraving</option>
                <option value="brass">Polished Brass plate</option>
                <option value="rto">RTO Vehicle plate</option>
              </select>
            </div>

            {material === 'neon' && (
              <div className="form-group-bento">
                <label>Glow Palette</label>
                <div className="color-swatches">
                  {colorOptions.map(c => (
                    <button
                      key={c.hex}
                      className={`color-swatch ${glowColor === c.hex ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      onClick={() => setGlowColor(c.hex)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="form-group-bento">
              <label>Font Styling</label>
              <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="bento-select">
                <option value="neon-font">Tech Sans</option>
                <option value="serif-font">Luxury Serif</option>
                <option value="mono-font">Bold Monospace</option>
                <option value="bold-font">Impact Display</option>
              </select>
            </div>

            {material !== 'rto' && (
              <div className="dimension-sliders-bento">
                <div className="form-group-bento">
                  <label>Width ({boardWidth}″)</label>
                  <input 
                    type="range" min={12} max={72} 
                    value={boardWidth} 
                    onChange={(e) => setBoardWidth(Number(e.target.value))} 
                  />
                </div>
                <div className="form-group-bento">
                  <label>Height ({boardHeight}″)</label>
                  <input 
                    type="range" min={6} max={36} 
                    value={boardHeight} 
                    onChange={(e) => setBoardHeight(Number(e.target.value))} 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Block 5: Share Your Work Form (Col-Span 1) */}
          <div className="bento-block create-post-block">
            <h3>Add Your Signage Work</h3>
            <p className="block-meta-text">Upload details to showcase custom work on the community feed.</p>
            <form onSubmit={handleCreatePost} className="bento-post-form">
              <input 
                type="text" 
                placeholder="Title of project..." 
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
                className="bento-input"
              />
              <textarea 
                placeholder="Material specifications, dimensions, location..." 
                value={newPostDesc}
                onChange={(e) => setNewPostDesc(e.target.value)}
                required
                className="bento-textarea"
              />
              <div className="form-group-bento" style={{ marginTop: '4px', marginBottom: '8px' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewPostImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="bento-input-file"
                />
              </div>
              <div className="bento-post-form-row">
                <select 
                  value={newPostCategory} 
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="bento-select"
                >
                  <option value="neon">Neon LED Sign</option>
                  <option value="rto">RTO Number Plate</option>
                  <option value="nameplate">Teak Wood Plate</option>
                  <option value="signage">3D Acrylic Signage</option>
                </select>
                <button type="submit" className="btn btn-primary btn-sm">Add Post</button>
              </div>
            </form>
          </div>

          {/* Block 6: Showcase Feed (Col-Span 2) */}
          <div className="bento-block col-span-2 feed-block">
            <div className="feed-header">
              <h3>Community Showcase Gallery</h3>
              <span className="text-secondary">{filteredPosts.length} posts listed</span>
            </div>

            <div className="clean-post-list">
              {filteredPosts.length === 0 ? (
                <div className="no-posts-box">
                  <p>No projects match your search query.</p>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <div className="clean-post-card" key={post.id}>
                    {/* Upvote controller */}
                    <div className="clean-vote-bar">
                      <button 
                        className={`vote-btn ${post.userVote === 'up' ? 'active' : ''}`}
                        onClick={() => handleVote(post.id, 'up')}
                      >
                        <FaArrowUp />
                      </button>
                      <span className="vote-number">{post.upvotes}</span>
                      <button 
                        className={`vote-btn ${post.userVote === 'down' ? 'active' : ''}`}
                        onClick={() => handleVote(post.id, 'down')}
                      >
                        <FaArrowDown />
                      </button>
                    </div>

                    {/* Content area */}
                    <div className="clean-post-body">
                      <div className="post-header-info">
                        <span className="post-author-name">{post.author}</span>
                        <span className="post-time-ago"><FaClock /> {post.time}</span>
                      </div>
                      <h4 className="post-clean-title">{post.title}</h4>
                      <p className="post-clean-desc">{post.description}</p>
                      
                      {post.image && (
                        <div className="clean-post-image-container" style={{ margin: '12px 0', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                          <img src={post.image} alt="Custom work preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', display: 'block' }} />
                        </div>
                      )}

                      {/* Display neat layout comments */}
                      <div className="organized-comments-box">
                        <div className="comment-header-row">
                          <button 
                            className="toggle-comment-btn"
                            onClick={() => setShowCommentInput(showCommentInput === post.id ? null : post.id)}
                          >
                            <FaCommentAlt /> {post.comments.length} Comments
                          </button>
                        </div>

                        {showCommentInput === post.id && (
                          <div className="clean-comments-wrapper">
                            <div className="comment-feed-bubble-list">
                              {post.comments.length === 0 ? (
                                <p className="text-muted text-xs">No comments yet. Write one below!</p>
                              ) : (
                                post.comments.map((comment, index) => (
                                  <div className="comment-bubble" key={index}>
                                    <div className="comment-bubble-meta">
                                      <strong>{comment.author}</strong> • <span>{comment.time}</span>
                                    </div>
                                    <div className="comment-bubble-text">{comment.text}</div>
                                  </div>
                                ))
                              )}
                            </div>

                            <form 
                              className="comment-bubble-form"
                              onSubmit={(e) => {
                                e.preventDefault();
                                const text = e.target.commentText.value;
                                handleAddComment(post.id, text);
                                e.target.commentText.value = '';
                              }}
                            >
                              <input 
                                type="text" 
                                name="commentText" 
                                placeholder="Write a clean response..." 
                                required 
                              />
                              <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Block 7: Location & Contacts (Col-Span 3) */}
          <div className="bento-block col-span-3 contact-block-bento" id="contact-block">
            <h3>Visit Our Workshop Showroom</h3>
            <p className="block-meta-text">Step by our Mysore workshop to check and feel materials in person.</p>
            
            <div className="bento-contact-details-row">
              <div className="contact-card-info-item">
                <FaMapMarkerAlt className="blue-icon" />
                <div>
                  <h5>Location Address</h5>
                  <p>Ultra Radiums & Signboards, #09, 16th cross, 4th main vidyaranyapuram Mysore</p>
                </div>
              </div>

              <div className="contact-card-info-item">
                <FaPhoneAlt className="blue-icon" />
                <div>
                  <h5>Call / WhatsApp</h5>
                  <p>+91 94830 31324</p>
                </div>
              </div>

              <div className="contact-card-info-item">
                <FaEnvelope className="blue-icon" />
                <div>
                  <h5>Email Inquiries</h5>
                  <p>ultraradiums@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bento-map-box">
              <span className="map-tag">Vidyaranyapuram Showroom Hub</span>
              <a 
                href="https://maps.google.com/?q=Ultra+Radiums+Vidyaranyapuram+Mysore" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary btn-sm"
              >
                <FaExternalLinkAlt /> View Google Map Directions
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bento-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Ultra Radiums Mysore. Designed with a calm, cool light blue Bento Grid layout.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
