const imageContainers = document.querySelectorAll(".image-container");

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

imageContainers.forEach((container) => {
  let mouse = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  
  const img = container.querySelector("img");
  const originalTransform = getComputedStyle(img).transform; // Store original transform

  container.addEventListener("mousemove", (event) => {
    const { left, top, width, height } = container.getBoundingClientRect();
    mouse.x = event.clientX - left - width / 2;
    mouse.y = event.clientY - top - height / 2;
  });

  function animate() {
    target.x = lerp(target.x, mouse.x, 0.2);
    target.y = lerp(target.y, mouse.y, 0.2);

    gsap.to(img, {
      x: target.x * 0.6, // Moves with cursor
      y: target.y * 0.8,
      duration: 0.1,
      ease: "power2.out",
    });

    requestAnimationFrame(animate);
  }

  container.addEventListener("mouseenter", () => {
    gsap.to(container, { zIndex: 10, duration: 0.1 });
    gsap.to(img, { scale: 1.3, duration: 0.3, ease: "power2.out" });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to(container, { zIndex: 1, duration: 0.3 });

    // Reset position & scale smoothly
    gsap.to(img, { 
      x: 0, 
      y: 0,  
      scale: 1, 
      duration: 0.5, 
      ease: "power2.out",
      onComplete: () => {
        img.style.transform = originalTransform; // Restore the original transform
      }
    });

    mouse.x = 0;
    mouse.y = 0;
    target.x = 0;
    target.y = 0;
  });

  animate();
});
