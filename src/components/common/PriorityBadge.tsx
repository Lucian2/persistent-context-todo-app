import { FunctionComponent } from 'react';
import { getBadgeColor } from '../../utils/utils';

interface PriorityBadgeProps {
  label: string;
}

export const PriorityBadge: FunctionComponent<PriorityBadgeProps> = ({
  label,
}) => {
  return <span className={`badge bg-${getBadgeColor(label)}`}>{label}</span>;
};
