// ============================================
// CORONG 蔻容 — 公共JS (气象 + 肤色映射)
// ============================================

console.log("CORONG 蔻容 — 公共JS已加载 (气象 + 肤色映射完整版)");

// ========== 第一部分：气象页面功能 ==========
if (location.pathname.includes("climate.html")) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', getLocationAndWeather);
  } else {
    getLocationAndWeather();
  }
}

// 定位 - 优先使用浏览器GPS，失败则回退到Cloudflare IP定位
function getLocationAndWeather() {
  const tempEl = document.getElementById("temp");
  const humidityEl = document.getElementById("humidity");
  const riskEl = document.getElementById("risk");
  const adviceEl = document.getElementById("advice");
  
  if (!tempEl || !humidityEl || !riskEl || !adviceEl) {
    console.error("气象页面缺少必要的显示元素");
    return;
  }

  tempEl.textContent = "定位中...";
  humidityEl.textContent = "--";
  riskEl.textContent = "--";
  adviceEl.textContent = "正在获取您的位置和天气...";
  
  if (navigator.geolocation) {
    console.log("正在请求GPS定位权限...");
    
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`GPS定位成功: 纬度=${lat}, 经度=${lon}`);
        fetchWeather(lat, lon);
      },
      function(error) {
        console.log("GPS定位失败:", error.message);
        adviceEl.textContent = "使用IP位置估算...";
        fallbackToCloudflare();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  } else {
    console.log("浏览器不支持GPS定位");
    adviceEl.textContent = "您的浏览器不支持GPS定位，使用IP位置估算...";
    fallbackToCloudflare();
  }
}

// 回退到 Cloudflare IP 定位
function fallbackToCloudflare() {
  fetch('/cdn-cgi/trace')
    .then(res => res.text())
    .then(data => {
      const lines = data.split('\n');
      const trace = {};
      lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) trace[key] = value;
      });
      
      let lat, lon;
      
      if (trace.loc && trace.loc.includes(',')) {
        const parts = trace.loc.split(',');
        lat = parseFloat(parts[0]);
        lon = parseFloat(parts[1]);
        console.log(`使用 Cloudflare IP定位: ${lat}, ${lon}`);
        document.getElementById("advice").textContent = "基于IP位置的估算结果（非精准GPS）";
      } else {
        lat = 13.7563;
        lon = 100.5018;
        console.log('使用默认位置: 曼谷');
        document.getElementById("advice").textContent = "无法获取位置，显示曼谷参考数据";
      }
      
      fetchWeather(lat, lon);
    })
    .catch(err => {
      console.log('获取 Cloudflare 位置失败，使用默认曼谷', err);
      document.getElementById("advice").textContent = "网络错误，显示曼谷参考数据";
      fetchWeather(13.7563, 100.5018);
    });
}

// ✅【修复版】获取天气数据
function fetchWeather(lat, lon) {
  console.log(`正在获取 ${lat}, ${lon} 的天气数据`);
  
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&timezone=Asia/Bangkok`;
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("天气API返回数据:", data);
      
      if (data && data.current) {
        const temperature = data.current.temperature_2m;
        const humidity = data.current.relative_humidity_2m;
        
        console.log(`获取到数据: 温度=${temperature}℃, 湿度=${humidity}%`);
        showWeather(temperature, humidity);
      } else {
        console.log("API返回格式不对，使用默认值");
        showWeather(28, 65);
      }
    })
    .catch(error => {
      console.error("获取天气数据失败:", error);
      showWeather(28, 65);
      document.getElementById("advice").textContent = "天气数据获取失败，显示参考数据";
    });
}

// 展示天气 + 计算脱妆风险
function showWeather(temp, humidity) {
  const tempEl = document.getElementById("temp");
  const humidityEl = document.getElementById("humidity");
  const riskEl = document.getElementById("risk");
  const adviceEl = document.getElementById("advice");
  
  if (!tempEl || !humidityEl || !riskEl || !adviceEl) return;

  const risk = calculateRisk(temp, humidity);
  const advice = getAdvice(temp, humidity);

  tempEl.textContent = temp + " ℃";
  humidityEl.textContent = humidity + " %";
  riskEl.textContent = risk;
  adviceEl.textContent = advice;
}

// 脱妆风险算法
function calculateRisk(t, h) {
  if (h >= 85 || t >= 35) return "极高";
  if (h >= 80 && t >= 32) return "极高";
  if (h >= 75 || t >= 32) return "高";
  if (h >= 70 && t >= 30) return "高";
  if (h >= 65 || t >= 28) return "中等";
  if (h >= 55 && t >= 26) return "中等";
  return "低";
}

// 妆容建议算法
function getAdvice(t, h) {
  if (h >= 85) {
    return "湿度极高 → 强效妆前乳 + 散粉烘焙 + 定妆喷雾";
  }
  if (t >= 35) {
    return "极端高温 → 控油妆前乳 + 防水粉底 + 定妆散粉";
  }
  if (h >= 80 && t >= 32) {
    return "湿热桑拿 → 超薄底妆 + T区按压定妆 + 吸油纸";
  }
  if (h >= 75) {
    return "湿度偏高 → 持妆粉底液 + 全脸定妆";
  }
  if (t >= 32) {
    return "高温晴天 → 控油隔离 + 粉饼定妆";
  }
  if (h >= 65 || t >= 28) {
    return "轻微湿热 → 轻薄底妆 + 局部定妆";
  }
  return "气候适宜 → 正常持妆流程";
}

// ========== 第二部分：肤色映射功能 ==========

// 肤色产品推荐映射表 (20色完整版)
const skinProductMap = {
  1: {   // 冷调瓷白
    foundation: "冷调瓷白粉底液 #01",
    primer: "保湿亮肤妆前乳 (粉色款)",
    powder: "透明定妆散粉"
  },
  2: {   // 冷调象牙白
    foundation: "冷调象牙白粉底液 #02",
    primer: "保湿提亮妆前乳 (紫色款)",
    powder: "轻透柔光散粉"
  },
  3: {   // 冷调亮肤色
    foundation: "冷调亮肤粉底液 #03",
    primer: "水光感妆前乳",
    powder: "清透持妆散粉"
  },
  4: {   // 中性亮白
    foundation: "中性亮白粉底液 #04",
    primer: "丝滑妆前乳 (自然款)",
    powder: "自然柔焦散粉"
  },
  5: {   // 中性自然白
    foundation: "中性自然白粉底液 #05",
    primer: "保湿隔离乳",
    powder: "轻透定妆粉"
  },
  6: {   // 中性标准肤色
    foundation: "中性标准粉底液 #06",
    primer: "控油妆前乳 (经典款)",
    powder: "哑光定妆散粉"
  },
  7: {   // 暖调象牙白
    foundation: "暖调象牙白粉底液 #07",
    primer: "保湿焕彩妆前乳 (金色款)",
    powder: "光泽感定妆粉"
  },
  8: {   // 暖调自然偏白
    foundation: "暖调自然偏白粉底液 #08",
    primer: "滋润型妆前乳",
    powder: "自然定妆粉"
  },
  9: {   // 暖调自然色
    foundation: "暖调自然色粉底液 #09",
    primer: "柔焦妆前乳",
    powder: "持妆散粉"
  },
  10: {  // 暖调浅小麦
    foundation: "暖调浅小麦粉底液 #10",
    primer: "防晒妆前乳",
    powder: "小麦色专用散粉"
  },
  11: {  // 自然小麦色
    foundation: "自然小麦色粉底液 #11",
    primer: "控油隔离霜",
    powder: "哑光散粉"
  },
  12: {  // 浅古铜色
    foundation: "浅古铜色粉底液 #12",
    primer: "保湿妆前乳",
    powder: "古铜定妆粉"
  },
  13: {  // 中调小麦
    foundation: "中调小麦粉底液 #13",
    primer: "持久妆前乳",
    powder: "透明定妆粉"
  },
  14: {  // 暖调小麦
    foundation: "暖调小麦粉底液 #14",
    primer: "滋润隔离霜",
    powder: "暖调定妆粉"
  },
  15: {  // 深小麦色
    foundation: "深小麦色粉底液 #15",
    primer: "保湿提亮乳",
    powder: "深肤色专用散粉"
  },
  16: {  // 健康古铜
    foundation: "健康古铜粉底液 #16",
    primer: "防晒隔离霜",
    powder: "古铜持妆散粉"
  },
  17: {  // 深古铜色
    foundation: "深古铜色粉底液 #17",
    primer: "控油妆前乳 (强效款)",
    powder: "哑光古铜散粉"
  },
  18: {  // 冷调深肤色
    foundation: "冷调深肤色粉底液 #18",
    primer: "保湿妆前乳 (深肤专用)",
    powder: "清透定妆粉"
  },
  19: {  // 暖调深棕
    foundation: "暖调深棕粉底液 #19",
    primer: "滋润妆前乳",
    powder: "暖调持妆散粉"
  },
  20: {  // 黑调健康肌
    foundation: "黑调健康肌粉底液 #20",
    primer: "保湿隔离乳 (深肤款)",
    powder: "透明柔光散粉"
  }
};

// 肤色名称映射
const skinNameMap = {
  1: "冷调瓷白",
  2: "冷调象牙白",
  3: "冷调亮肤色",
  4: "中性亮白",
  5: "中性自然白",
  6: "中性标准肤色",
  7: "暖调象牙白",
  8: "暖调自然偏白",
  9: "暖调自然色",
  10: "暖调浅小麦",
  11: "自然小麦色",
  12: "浅古铜色",
  13: "中调小麦",
  14: "暖调小麦",
  15: "深小麦色",
  16: "健康古铜",
  17: "深古铜色",
  18: "冷调深肤色",
  19: "暖调深棕",
  20: "黑调健康肌"
};

// 初始化肤色映射（在AI肤色页面调用）
function initSkinMapping() {
  const skinElements = document.querySelectorAll('.skin');
  if (skinElements.length === 0) return;
  
  const savedLevel = localStorage.getItem('skinLevel');
  
  if (savedLevel) {
    skinElements.forEach(dot => {
      dot.classList.remove('active');
    });
    
    skinElements.forEach(dot => {
      if (dot.dataset.level === savedLevel) {
        dot.classList.add('active');
      }
    });
    
    renderSkinResult(savedLevel);
  }
}

// 渲染肤色结果和产品推荐
function renderSkinResult(level) {
  const resultDiv = document.getElementById('skin-result');
  const foundationSpan = document.getElementById('foundation');
  const primerSpan = document.getElementById('primer');
  const powderSpan = document.getElementById('powder');
  
  if (!resultDiv || !foundationSpan || !primerSpan || !powderSpan) return;
  
  const skinName = skinNameMap[level] || "未知肤色";
  
  resultDiv.textContent = `✨ 已选择：${level}号 · ${skinName} ✨`;
  
  const products = skinProductMap[level];
  if (products) {
    foundationSpan.textContent = products.foundation;
    primerSpan.textContent = products.primer;
    powderSpan.textContent = products.powder;
  } else {
    foundationSpan.textContent = "--";
    primerSpan.textContent = "--";
    powderSpan.textContent = "--";
  }
  
  localStorage.setItem('skinLevel', level);
}

// 手动设置肤色的函数
function setSkinLevel(level) {
  renderSkinResult(level);
  
  const skinElements = document.querySelectorAll('.skin');
  skinElements.forEach(dot => {
    if (dot.dataset.level == level) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// ========== 第三部分：页脚固定功能 ==========
document.addEventListener('DOMContentLoaded', function() {
  fixFooterPosition();
  window.addEventListener('resize', fixFooterPosition);
  
  // 在肤色页面自动初始化
  if (document.querySelector('.skin')) {
    initSkinMapping();
  }
});

function fixFooterPosition() {
  const styleId = 'footer-fix-style';
  let styleTag = document.getElementById(styleId);
  
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }
  
  styleTag.textContent = `
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .header {
      flex-shrink: 0;
    }
    .container {
      flex: 1 0 auto;
      padding-bottom: 20px;
    }
    .footer {
      flex-shrink: 0;
      width: 100%;
      background: #000;
      padding: 26px 20px;
      text-align: center;
      margin-top: auto;
    }
  `;
  
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.style.marginTop = 'auto';
  }
}

window.addEventListener('load', function() {
  fixFooterPosition();
});