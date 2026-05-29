import { Request, Response } from 'express';
import { readJson, writeJson } from '../storage/db';
import { User } from '../../../shared/types';
import { generateSalt, hashPassword, generateToken } from '../auth/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const users = await readJson<User[]>('users/users', []);
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);

    const newUser: User = {
      id: Date.now().toString(),
      username,
      passwordHash,
      salt,
      createdAt: Date.now()
    };

    users.push(newUser);
    await writeJson('users/users', users);

    const token = generateToken(newUser.id);
    res.json({ token, user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const users = await readJson<User[]>('users/users', []);
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const hash = hashPassword(password, user.salt);
    if (hash !== user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
