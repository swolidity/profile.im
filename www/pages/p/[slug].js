const Page = ({page}) => {

    return (
        <div>{page.title}</div>
    )
}

Page.getInitialProps = ({ query: { slug }}) => {
    const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  return await res.json();
}