import bgImage1 from '../images/image.jpg';
import bgImage2 from '../images/bgImage.jpg';

function WelcomePage() {
  return (
    <div
      className="relative h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage1})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Text Container */}
      <div className="relative z-10 text-center">
        <h1 className="text-white text-4xl font-bold">Discover SkillSwap - Trade Skills, Not Money!</h1>
      </div>
    </div>
  );
}

export default WelcomePage;