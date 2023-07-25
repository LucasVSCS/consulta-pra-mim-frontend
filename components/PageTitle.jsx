import Head from 'next/head'

export default function PageTitle ({ label }) {
  return (
    <Head>
      <title>{label}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
