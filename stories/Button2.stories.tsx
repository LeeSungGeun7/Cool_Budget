import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MyComponent from '../components/Button';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const Template: ComponentStory<typeof MyComponent> = (args) => <MyComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  // 기본 props 설정
};