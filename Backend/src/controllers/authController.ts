import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authController = {
  registerUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ username, email, password: hashedPassword });

      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error('Error in registerUser:', error);
      res.status(500).send('Server error');
    }
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      
      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '5m' }
      );

      res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, username: user.username, email: user.email },
        token
      });
    } catch (error) {
      console.error('Error in loginUser:', error);
      res.status(500).send('Server error');
    }
  },
};

export default authController;