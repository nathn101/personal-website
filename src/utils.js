import imagesLoaded from 'imagesloaded';

export const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        // Use the imagesLoaded library to ensure all images are fully loaded.
        // This is particularly useful for getting accurate dimensions, avoiding layout shifts, etc.
        // `background: true` ensures background images are also loaded.
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

export const getMouseEnterDirection = (element, lastX, lastY) => {
    const { top, right, bottom, left } = element.getBoundingClientRect();
    
    if (lastY <= Math.floor(top)) return "top";
    if (lastY >= Math.floor(bottom)) return "bottom";
    if (lastX <= Math.floor(left)) return "left";
    if (lastX >= Math.floor(right)) return "right";
    
    return "unknown";
}