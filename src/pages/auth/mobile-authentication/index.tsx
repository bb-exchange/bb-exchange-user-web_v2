const index = () => {
  return <div>Enter</div>;
};

export default index;

export function getStaticProps() {
  return { props: { navBar: true } };
}
