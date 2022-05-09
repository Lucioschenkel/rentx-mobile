import styled from 'styled-components/native';

interface BulletProps {
  active?: boolean;
}

export const Container = styled.View<BulletProps>`
  width: 6px;
  height: 6px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
  border-radius: 3px;
  margin-left: 8px;
`;
