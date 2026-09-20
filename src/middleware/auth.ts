import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export interface AuthRequest extends Request { user?: { id:string; tenantId:string; email:string } }
export function auth(req:AuthRequest,res:Response,next:NextFunction){ const h=req.headers.authorization; if(!h?.startsWith('Bearer ')) return res.status(401).json({message:'Token não informado'}); try { const p=jwt.verify(h.slice(7),process.env.JWT_SECRET||'change-me') as jwt.JwtPayload; if(!p.sub||!p.tenantId) throw new Error(); req.user={id:String(p.sub),tenantId:String(p.tenantId),email:String(p.email||'')}; next(); } catch { return res.status(401).json({message:'Token inválido'}); } }
