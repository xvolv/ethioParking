// src/WelcomeBanner.jsx
export default function WelcomeBanner() {
  return (
    <div style={{
      backgroundColor: '#112941',
      padding: '5% 0',
      textAlign: 'center'
    }}>
      <h2 style={{
        color: 'whitesmoke',
        fontFamily: "'Times New Roman', Times, serif",
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: '1.8rem',
        padding: '20px'
      }}>
        Welcome to Your Smart, Secure, and Safe Vehicle Parking Solution
      </h2>
      <p style={{
        color: 'white',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: 'lighter',
        fontSize: '1.2rem',
        marginTop: '20px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        We are delighted to welcome you to a new era of parking! Our platform offers a smart,
        secure, and safe parking experience designed to give you peace of mind every time you park.
      </p>
    </div>
  );
}
