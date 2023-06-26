import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

const MockChildComponent = () => <div>Child Component</div>;

describe('Layout', () => {
  test('renders the Header component with the correct title', () => {
    render(
      <Layout>
        <MockChildComponent />
      </Layout>
    );
    const headerElement = screen.getByText('A Blog site');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the children component', () => {
    render(
      <Layout>
        <MockChildComponent />
      </Layout>
    );
    const childComponentElement = screen.getByText('Child Component');
    expect(childComponentElement).toBeInTheDocument();
  });

  test('renders the Layout component', () => {
    render(
      <Layout>
        <MockChildComponent />
      </Layout>
    );
    const layoutContainerElement = screen.getByRole('presentation');
    expect(layoutContainerElement).toBeInTheDocument();
  });
});
