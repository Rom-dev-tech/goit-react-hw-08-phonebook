import Container from 'components/Container';
import 'views/HomeView/HomeView.scss';

const HomeView = () => (
  <section className="homeviews">
    <Container>
      <div className="homeviews__wrapper">
        <h1 className="title">Hello my friend, welcome to our service!</h1>
      </div>
    </Container>
  </section>
);

export default HomeView;
