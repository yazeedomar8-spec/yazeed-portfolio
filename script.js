// تفعيل التفاعل عند تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== المتغيرات العامة ==========
  let currentLang = 'en'; // اللغة الافتراضية: إنجليزي
  const langToggle = document.getElementById('langToggle');
  const langText = document.getElementById('langText');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // ========== 1. تفعيل Dark Mode ==========
  
  // التحقق من وجود تفضيل سابق في localStorage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // تبديل الوضع الليلي/النهاري
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
  
  // ========== 2. تفعيل الترجمة (عربي/إنجليزي) ==========
  
  // دالة تغيير اللغة
  function toggleLanguage() {
    if (currentLang === 'en') {
      // التبديل إلى العربية
      currentLang = 'ar';
      langText.textContent = 'English';
      body.classList.add('rtl');
      document.documentElement.lang = 'ar';
    } else {
      // التبديل إلى الإنجليزية
      currentLang = 'en';
      langText.textContent = 'عربي';
      body.classList.remove('rtl');
      document.documentElement.lang = 'en';
    }
    
    // تحديث النصوص في الصفحة
    updateTexts();
    
    // حفظ اللغة المختارة
    localStorage.setItem('language', currentLang);
  }
  
  // دالة تحديث جميع النصوص بناءً على اللغة الحالية
  function updateTexts() {
    // تحديث logo
    const logo = document.getElementById('logo');
    if (currentLang === 'ar') {
      logo.textContent = 'يزيد';
    } else {
      logo.textContent = 'YAZEED';
    }
    
    // تحديث جميع العناصر التي تحتوي على data-en و data-ar
    document.querySelectorAll('[data-en][data-ar]').forEach(element => {
      const enText = element.getAttribute('data-en');
      const arText = element.getAttribute('data-ar');
      
      if (currentLang === 'ar') {
        element.textContent = arText;
      } else {
        element.textContent = enText;
      }
    });
    
    // تحديث روابط التنقل (بما أن فيها نص أيضاً)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      if (currentLang === 'ar') {
        link.textContent = link.getAttribute('data-ar');
      } else {
        link.textContent = link.getAttribute('data-en');
      }
    });
  }
  
  // تحميل اللغة المحفوظة
  if (localStorage.getItem('language') === 'ar') {
    currentLang = 'en'; // مؤقتاً عشان التoggle يشتغل صح
    toggleLanguage(); // هذا رح يحولها لعربي
  }
  
  // حدث النقر على زر اللغة
  langToggle.addEventListener('click', toggleLanguage);
  
  // ========== 3. تمرير سلس للروابط ==========
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== 4. رسالة تأكيد ==========
  console.log('✅ تم تحميل JavaScript بنجاح');
  console.log('🌓 Dark Mode: متاح');
  console.log('🌐 الترجمة: عربي/إنجليزي');
  console.log('✨ المهارات: تأثير HOVER (بدون كلك)');
});
