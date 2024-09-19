import express  from 'express';
import { userRoutes } from '../module/user/user.route';
import { chatRoutes } from '../module/chat/chat.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: chatRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
