import Bubble from "./Bubble";

const BubbleParticles = () => {

    const bubbles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 18 + 6,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 8 + 10,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

            {bubbles.map((bubble) => (
                <Bubble
                    key={bubble.id}
                    size={bubble.size}
                    left={bubble.left}
                    delay={bubble.delay}
                    duration={bubble.duration}
                />
            ))}

        </div>
    );
};

export default BubbleParticles;