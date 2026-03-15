// تفعيل التفاعل عند تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
  
  // تحديد جميع عناصر المهارات
  const skillBoxes = document.querySelectorAll('.skill-box');

  // دالة لإزالة التحديد من جميع المهارات
  function removeHighlight() {
    skillBoxes.forEach(box => box.classList.remove('highlight'));
  }

  // إضافة حدث النقر لكل مهارة
  skillBoxes.forEach(box => {
    box.addEventListener('click', function(e) {
      e.stopPropagation(); // منع انتشار الحدث للعناصر الخارجية
      
      // إذا كانت المهارة محددة بالفعل، قم بإلغاء تحديدها
      if (this.classList.contains('highlight')) {
        this.classList.remove('highlight');
      } else {
        // وإلا، قم بإزالة التحديد من الكل ثم حدد هذه المهارة
        removeHighlight();
        this.classList.add('highlight');
      }
    });
  });

  // النقر في أي مكان آخر يزيل التحديد
  document.body.addEventListener('click', function(e) {
    if (!e.target.classList || !e.target.classList.contains('skill-box')) {
      removeHighlight();
    }
  }, false);

  // رسالة تأكيد في وحدة التحكم
  console.log('✅ تم تحميل JavaScript بنجاح: يمكنك النقر على المهارات لتحديدها');
  
  // إضافة تمرير سلس عند النقر على روابط التنقل
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
});
