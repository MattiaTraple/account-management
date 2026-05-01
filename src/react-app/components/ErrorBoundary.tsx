import { Component, type ReactNode } from 'react';
import GenericError from '../pages/GenericError';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <GenericError />;
    }
    return this.props.children;
  }
}
