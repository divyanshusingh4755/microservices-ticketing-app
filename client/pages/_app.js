import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps }) => {
    return (
        <div>
            <Component {...pageProps} />
        </div>
    )
};

AppComponent.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get("/api/users/currentuser");
    return data;
}

export default AppComponent;
