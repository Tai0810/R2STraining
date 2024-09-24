import { render, screen } from "@testing-library/react";
import Post from "../Post";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: any }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Test Post component', () => {
  const post = {
    id: 1,
    userId: 1,
    title: 'Title',
    body: 'Body',
    name: 'John',
  };
  const React = require('react');
  test('Should render Post with title, body and author', () => {
    const setEdingField = jest.fn();
    const useStateMock = () => ['', setEdingField];
    React.useState.mockImplementation(useStateMock);
    render(<Post post={post} />);
    const titleElement = screen.getByText('Title');
    const bodyElement = screen.getByText('Body');
    const nameElement = screen.getByTestId('author');
    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });
  test('Should show body input if editingField is body', () => {
    const setEdingField = jest.fn();
    const useStateMock = () => ['body', setEdingField];
    React.useState.mockImplementation(useStateMock);
    render(<Post post={post} />);
    const bodyInput = screen.getByTestId('bodyInput');
    expect(bodyInput).toBeInTheDocument();
  });
  test('Should show author input if editingField is author', () => {
    const setEdingField = jest.fn();
    const useStateMock = () => ['author', setEdingField];
    React.useState.mockImplementation(useStateMock);
    render(<Post post={post} />);
    const authorInput = screen.getByTestId('authorInput');
    expect(authorInput).toBeInTheDocument();
  });
});