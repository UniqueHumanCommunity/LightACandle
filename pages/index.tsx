import { useEffect, useState } from 'react';
import MiniKit from '@worldcoin/minikit-js';

const Home = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.MiniKit) {
      window.MiniKit.isInstalled().then((installed: boolean) => {
        setIsInstalled(installed);
      });
    }
  }, []);

  const lightCandle = async () => {
    if (isInstalled) {
      try {
        await window.MiniKit.Commands.Pay({
          amount: 1,
          currency: 'WLD',
          to: process.env.NEXT_PUBLIC_WLD_RECEIVER_ADDRESS,
        });
        setMessage('Your candle has been lit!');
      } catch (error) {
        console.error('Payment failed:', error);
        setMessage('Failed to light the candle. Please try again.');
      }
    } else {
      setMessage('Please open this mini app in the World App to proceed.');
    }
  };

  return (
    <div className="holder">
      <div className="candle">
        <div className="blinking-glow"></div>
        <div className="thread"></div>
        <div className="glow"></div>
        <div className="flame"></div>
      </div>
      <button onClick={lightCandle}>Light a Candle</button>
      {message && <p>{message}</p>}
      <style jsx>{`
        .holder {
          margin: 12rem auto 0;
          width: 150px;
          height: 400px;
          position: relative;
        }
        .candle {
          bottom: 0;
          width: 150px;
          height: 300px;
          border-radius: 150px / 40px;
          box-shadow: inset 20px -30px 50px 0 rgba(0, 0, 0, 0.4), inset -20px 0 50px 0 rgba(0, 0, 0, 0.4);
          background: #190f02;
          background: linear-gradient(#e48825, #e78e0e, #833c03, #4c1a03 50%, #1c0900);
        }
        .candle:before {
          width: 100%;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #d47401;
          background: #b86409;
          background: radial-gradient(#eaa121, #8e4901 45%, #b86409 80%);
        }
        .candle:after {
          width: 34px;
          height: 10px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          top: 14px;
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
          background: radial-gradient(rgba(0, 0, 0, 0.6), transparent 45%);
        }
        .thread {  
          width: 6px;
          height: 36px;
          top: -17px;
          left: 50%;
          z-index: 1;
          border-radius: 40% 40% 0 0;
          transform: translateX(-50%);
          background: #121212;
          background: linear-gradient(#d6994a, #4b232c, #121212, black, #e8bb31 90%);
        }
        .flame {
          width: 24px;
          height: 120px;
          left: 50%;
          transform-origin: 50% 100%;
          transform: translateX(-50%);
          bottom: 100%;
          border-radius: 50% 50% 20% 20%;
          background: rgba(255, 255, 255, 1);
          background: linear-gradient(white 80%, transparent);
          animation: moveFlame 6s linear infinite, enlargeFlame 5s linear infinite;
        }
        .flame:before {
          width: 100%;
          height: 100%;
          border-radius: 50% 50% 20% 20%;
          box-shadow: 0 0 15px 0 rgba(247, 93, 0, .4), 0 -6px 4px 0 rgba(247, 128, 0, .7);
        }
        @keyframes moveFlame {
          0%, 100% {
            transform: translateX(-50%) rotate(-2deg);
          }
          50% {
            transform: translateX(-50%) rotate(2deg);
          }
        }
        @keyframes enlargeFlame {
          0%, 100% {
            height: 120px;
          }
          50% {
            height: 140px;
          }
        }
        .glow {
          width: 26px;
          height: 60px;
          border-radius: 50% 50% 35% 35%;
          left: 50%;
          top: -48px;
          transform: translateX(-50%);
          background: rgba(0, 133, 255, .7);
          box-shadow: 0 -40px 30px 0 #dc8a0c, 0 40px 50px 0 #dc8a0c, inset 3px 0 2px 0 rgba(0, 133, 255, .6), inset -3px 0 2px 0 rgba(0, 133, 255, .6);
        }
        .glow:before {
          width: 70%;
          height: 60%;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.35);
        }
        .blinking-glow {
          width: 100px;
          height: 180px;
          left: 50%;
          top: -55%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: #ff6000;
          filter: blur(60px);
          animation: blinkIt .1s infinite;
        }
        @keyframes blinkIt {
          50% { opacity: .8;}
        }
        button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #ff6000;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #e55b00;
        }
      `}</style>
    </div>
  );
};

export default Home;