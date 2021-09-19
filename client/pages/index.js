const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>You are Signed in</h1> : <h1>You are not signed in</h1>
};

export default LandingPage;