import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import { Layout } from 'antd';

import Sidebar from '../components/common/Sidebar';
import Head from 'next/head';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';

const DynamicFooter = dynamic(() => import('../components/common/Footer'), {
  ssr: false,
});

const CustomContents = styled(Layout.Content)`
  display: flex;
  height: calc(100vh - 70px);
  overflow: auto;
  background-color: white;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Head>
        <title>Usher</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <Layout>
        <CustomContents>
          <Component {...pageProps} />
        </CustomContents>
        <DynamicFooter />
      </Layout>
    </Layout>
  );
}

export default MyApp;
