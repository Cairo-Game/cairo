import { CombinedState } from '@reduxjs/toolkit';
import { IForumState } from '../../../store/slices/ForumSlice';
import { RatingState } from '../../../store/slices/RatingSlice';
import { UserState } from '../../../store/slices/UserSlice';

export const html = (
    location: string,
    component: string,
    reduxState: CombinedState<{
        user: UserState;
        forum: IForumState;
        rating: RatingState;
    }>,
) => `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/bundle-scss.css">
  <title>${location.slice(1).toUpperCase()}</title>
</head>
<body>
<div id="main">${component}</div>
<script>
      window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
  </script>
  <script src="/main.js"></script>
</body>
</html>`;
