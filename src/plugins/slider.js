
class Slider {
    
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.sliderContainer = this.slider.querySelector('.ubt-slider-container');
        this.slides = this.slider.querySelectorAll('.ubt-slide');
        this.totalSlides = this.slides.length;
        this.currentIndex = 0;

        this.initTouchEvents();
        this.initCaretEvents();
    }

    initTouchEvents() {
        let startX, endX;

        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.slider.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        this.slider.addEventListener('touchend', () => {
            if (startX > endX) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        });
    }

    initCaretEvents() {
        const caretLeft = this.slider.querySelector('.caret-left');
        const caretRight = this.slider.querySelector('.caret-right');

        caretLeft.addEventListener('click', () => this.prevSlide());
        caretRight.addEventListener('click', () => this.nextSlide());
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlidePosition();
        }
    }

    nextSlide() {
        if (this.currentIndex < (this.totalSlides - 1 )) {
            this.currentIndex++;
            this.updateSlidePosition();
        }
    }

    updateSlidePosition() {
        const offset = -this.currentIndex * 100;
        this.sliderContainer.style.transform = `translateX(${offset}%)`;
    }

    getCurrentIndex() {
        return this.currentIndex;
    }
}

export {Slider};