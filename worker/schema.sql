-- CORONG 数据库初始化
-- 在Cloudflare D1控制台执行这些SQL

-- UGC帖子表
CREATE TABLE IF NOT EXISTS ugc_posts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  tags TEXT DEFAULT '[]',
  likes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 用户积分表
CREATE TABLE IF NOT EXISTS user_points (
  user_id TEXT PRIMARY KEY,
  total_points INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 积分记录表
CREATE TABLE IF NOT EXISTS points_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  points INTEGER NOT NULL,
  reason TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

-- 测试数据
INSERT INTO ugc_posts (id, user_id, image_url, caption, tags, likes)
VALUES
  ('1', 'nattaya', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', '今日清透裸妆，配合CORONG W21色号！', '["清透裸妆","自然日常"]', 234),
  ('2', 'malee', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', '清迈旅行妆，高温高湿照样持妆8小时！', '["泰式甜美","清透裸妆"]', 189),
  ('3', 'sirin', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', '复古红唇配哑光粉底，这个组合绝了🔥', '["复古红唇"]', 312);
