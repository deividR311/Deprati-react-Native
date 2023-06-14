import TestRenderer from 'react-test-renderer';
import * as React from 'react';

export interface IRender {
  update: (
    component: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >
  ) => void;
  unmount: () => void;
  container: TestRenderer.ReactTestInstance;
  rerender: (
    component: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >
  ) => void;
  toJSON: () =>
    | TestRenderer.ReactTestRendererJSON
    | TestRenderer.ReactTestRendererJSON[]
    | null;
  debug: DebugFunction;
  getByLabelText: (
    label: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance;
  getAllByLabelText: (
    label: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance[];
  queryByLabelText: (
    label: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByLabelText: (
    label: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance[];
  findByLabelText: (
    label: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findAllByLabelText: (
    label: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  getByA11yHint: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance;
  getByHintText: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance;
  getAllByA11yHint: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance[];
  getAllByHintText: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance[];
  queryByA11yHint: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance | null;
  queryByHintText: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByA11yHint: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance[];
  queryAllByHintText: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance[];
  findByA11yHint: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findByHintText: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findAllByA11yHint: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  findAllByHintText: (
    a11yHint: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  getByRole: (
    role: RegExp | import('react-native').AccessibilityRole
  ) => TestRenderer.ReactTestInstance;
  getAllByRole: (
    role: RegExp | import('react-native').AccessibilityRole
  ) => TestRenderer.ReactTestInstance[];
  queryByRole: (
    role: RegExp | import('react-native').AccessibilityRole
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByRole: (
    role: RegExp | import('react-native').AccessibilityRole
  ) => TestRenderer.ReactTestInstance[];
  findByRole: (
    role: import('react-native').AccessibilityRole,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findAllByRole: (
    role: import('react-native').AccessibilityRole,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  getByA11yStates: (
    accessibilityStateKey:
      | keyof import('react-native').AccessibilityState
      | (keyof import('react-native').AccessibilityState)[]
  ) => TestRenderer.ReactTestInstance;
  getAllByA11yStates: (
    accessibilityStateKey:
      | keyof import('react-native').AccessibilityState
      | (keyof import('react-native').AccessibilityState)[]
  ) => TestRenderer.ReactTestInstance[];
  queryByA11yStates: (
    accessibilityStateKey:
      | keyof import('react-native').AccessibilityState
      | (keyof import('react-native').AccessibilityState)[]
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByA11yStates: (
    accessibilityStateKey:
      | keyof import('react-native').AccessibilityState
      | (keyof import('react-native').AccessibilityState)[]
  ) => TestRenderer.ReactTestInstance[];
  findByA11yStates: (
    accessibilityStateKey: keyof import('react-native').AccessibilityState,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findAllByA11yStates: (
    accessibilityStateKey: keyof import('react-native').AccessibilityState,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  getByA11yState: (
    accessibilityState: import('react-native').AccessibilityState
  ) => TestRenderer.ReactTestInstance;
  getAllByA11yState: (
    accessibilityState: import('react-native').AccessibilityState
  ) => TestRenderer.ReactTestInstance[];
  queryByA11yState: (
    accessibilityState: import('react-native').AccessibilityState
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByA11yState: (
    accessibilityState: import('react-native').AccessibilityState
  ) => TestRenderer.ReactTestInstance[];
  findByA11yState: (
    accessibilityState: import('react-native').AccessibilityState,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findAllByA11yState: (
    accessibilityState: import('react-native').AccessibilityState,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  getByA11yValue: (a11yValue: {
    min?: number | undefined;
    max?: number | undefined;
    now?: number | undefined;
    text?: string | undefined;
  }) => TestRenderer.ReactTestInstance;
  getAllByA11yValue: (a11yValue: {
    min?: number | undefined;
    max?: number | undefined;
    now?: number | undefined;
    text?: string | undefined;
  }) => TestRenderer.ReactTestInstance[];
  queryByA11yValue: (a11yValue: {
    min?: number | undefined;
    max?: number | undefined;
    now?: number | undefined;
    text?: string | undefined;
  }) => TestRenderer.ReactTestInstance | null;
  queryAllByA11yValue: (a11yValue: {
    min?: number | undefined;
    max?: number | undefined;
    now?: number | undefined;
    text?: string | undefined;
  }) => TestRenderer.ReactTestInstance[];
  findByA11yValue: (
    a11yValue: {
      min?: number | undefined;
      max?: number | undefined;
      now?: number | undefined;
      text?: string | undefined;
    },
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findAllByA11yValue: (
    a11yValue: {
      min?: number | undefined;
      max?: number | undefined;
      now?: number | undefined;
      text?: string | undefined;
    },
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  findAllByDisplayValue: (
    value: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | (import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions &
          import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions)
      | undefined,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  findAllByPlaceholder: () => void;
  findAllByPlaceholderText: (
    placeholder: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | (import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions &
          import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions)
      | undefined,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  findAllByTestId: (
    testId: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | (import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions &
          import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions)
      | undefined,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  findAllByText: (
    text: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | (import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions &
          import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions)
      | undefined,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance[]>;
  findByDisplayValue: (
    value: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | (import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions &
          import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions)
      | undefined,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findByPlaceholder: () => void;
  findByPlaceholderText: (
    placeholder: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | (import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions &
          import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions)
      | undefined,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findByTestId: (
    testId: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | (import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions &
          import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions)
      | undefined,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  findByText: (
    text: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | (import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions &
          import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions)
      | undefined,
    waitForOptions?:
      | import('../node_modules/@testing-library/react-native/build/waitFor.d.ts').WaitForOptions
      | undefined
  ) => Promise<TestRenderer.ReactTestInstance>;
  queryByText: (
    name: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByText: (
    text: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance[];
  queryByPlaceholderText: (
    placeholder: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByPlaceholderText: (
    placeholder: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance[];
  queryByDisplayValue: (
    value: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByDisplayValue: (
    value: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance[];
  queryByTestId: (
    testID: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance | null;
  queryAllByTestId: (
    testID: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch
  ) => TestRenderer.ReactTestInstance[];
  UNSAFE_queryByType: <P>(
    type: React.ComponentType<P>
  ) => TestRenderer.ReactTestInstance | null;
  UNSAFE_queryAllByType: <P_1>(
    type: React.ComponentType<P_1>
  ) => TestRenderer.ReactTestInstance[];
  UNSAFE_queryByProps: (props: {
    [key: string]: any;
  }) => TestRenderer.ReactTestInstance | null;
  UNSAFE_queryAllByProps: (props: {
    [key: string]: any;
  }) => TestRenderer.ReactTestInstance[];
  queryByName: () => void;
  queryByType: () => void;
  queryByProps: () => void;
  queryAllByName: () => void;
  queryAllByType: () => void;
  queryAllByProps: () => void;
  queryByPlaceholder: () => void;
  queryAllByPlaceholder: () => void;
  getByText: (
    text: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance;
  getByPlaceholderText: (
    placeholder: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance;
  getByDisplayValue: (
    value: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance;
  getByTestId: (
    testID: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance;
  getAllByTestId: (
    testID: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance[];
  getAllByText: (
    text: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance[];
  getAllByPlaceholderText: (
    placeholder: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance[];
  getAllByDisplayValue: (
    value: import('../node_modules/@testing-library/react-native/build/matches.d.ts').TextMatch,
    queryOptions?:
      | import('../node_modules/@testing-library/react-native/build/helpers/byText.d.ts').TextMatchOptions
      | undefined
  ) => TestRenderer.ReactTestInstance[];
  UNSAFE_getByType: <P_2>(
    type: React.ComponentType<P_2>
  ) => TestRenderer.ReactTestInstance;
  UNSAFE_getAllByType: <P_3>(
    type: React.ComponentType<P_3>
  ) => TestRenderer.ReactTestInstance[];
  UNSAFE_getByProps: (props: {
    [key: string]: any;
  }) => TestRenderer.ReactTestInstance;
  UNSAFE_getAllByProps: (props: {
    [key: string]: any;
  }) => TestRenderer.ReactTestInstance[];
}

interface DebugFunction {
  (message?: string): void;
  shallow: (message?: string) => void;
}
