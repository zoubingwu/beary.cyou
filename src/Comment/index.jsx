import * as React from 'preact';
import Comment from './Comment';

export function initComment(target) {
  React.render(<Comment />, target);
}
