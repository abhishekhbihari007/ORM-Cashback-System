/**
 * Icon utility - Provides reliable icon components
 * Uses lucide-react as the primary source to avoid react-icons naming inconsistencies
 */

import {
  CheckCircle2,
  Clock,
  Tag,
  XCircle,
  X,
  CheckCircle,
  CircleCheck,
  CircleX,
  Loader2,
  ArrowUpRight,
  Plus,
  Trash2,
  Download,
  User,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  ShoppingCart,
  Shield,
  Rocket,
  BarChart3,
  Crown,
  UserShield,
  UserTie,
  Star,
  ArrowUp,
  DollarSign,
  Users,
  FileCheck,
  FileText,
  Building,
  Home,
  Upload,
  Wallet,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
  Save,
  Link as LinkIcon,
  Image,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Pause,
  Play,
  PenSquare,
  AlertTriangle,
  Circle,
} from "lucide-react";
import { LucideProps } from "lucide-react";
import React from "react";

// Icon component wrapper with consistent sizing
type IconProps = LucideProps & {
  className?: string;
};

// Export commonly used icons with consistent naming
export const Icons = {
  // Status icons
  CheckCircle: (props: IconProps) => <CheckCircle2 {...props} />,
  CircleCheck: (props: IconProps) => <CircleCheck {...props} />,
  CircleX: (props: IconProps) => <CircleX {...props} />,
  XCircle: (props: IconProps) => <XCircle {...props} />,
  X: (props: IconProps) => <X {...props} />,
  Clock: (props: IconProps) => <Clock {...props} />,
  Tag: (props: IconProps) => <Tag {...props} />,
  
  // Action icons
  Spinner: (props: IconProps & { className?: string }) => (
    <Loader2 {...props} className={`animate-spin ${props.className || ""}`} />
  ),
  ArrowUpRight: (props: IconProps) => <ArrowUpRight {...props} />,
  Plus: (props: IconProps) => <Plus {...props} />,
  Trash: (props: IconProps) => <Trash2 {...props} />,
  Download: (props: IconProps) => <Download {...props} />,
  
  // Navigation icons
  User: (props: IconProps) => <User {...props} />,
  LogOut: (props: IconProps) => <LogOut {...props} />,
  Bell: (props: IconProps) => <Bell {...props} />,
  Search: (props: IconProps) => <Search {...props} />,
  ChevronDown: (props: IconProps) => <ChevronDown {...props} />,
  ChevronLeft: (props: IconProps) => <ChevronLeft {...props} />,
  ChevronRight: (props: IconProps) => <ChevronRight {...props} />,
  ArrowLeft: (props: IconProps) => <ArrowLeft {...props} />,
  
  // Feature icons
  ShoppingCart: (props: IconProps) => <ShoppingCart {...props} />,
  Shield: (props: IconProps) => <Shield {...props} />,
  Rocket: (props: IconProps) => <Rocket {...props} />,
  ChartBar: (props: IconProps) => <BarChart3 {...props} />,
  Crown: (props: IconProps) => <Crown {...props} />,
  UserShield: (props: IconProps) => <UserShield {...props} />,
  UserTie: (props: IconProps) => <UserTie {...props} />,
  Star: (props: IconProps) => <Star {...props} />,
  ArrowUp: (props: IconProps) => <ArrowUp {...props} />,
  
  // Dashboard icons
  DollarSign: (props: IconProps) => <DollarSign {...props} />,
  Users: (props: IconProps) => <Users {...props} />,
  FileCheck: (props: IconProps) => <FileCheck {...props} />,
  FileText: (props: IconProps) => <FileText {...props} />,
  Building: (props: IconProps) => <Building {...props} />,
  House: (props: IconProps) => <Home {...props} />,
  Upload: (props: IconProps) => <Upload {...props} />,
  Wallet: (props: IconProps) => <Wallet {...props} />,
  
  // Social icons
  Facebook: (props: IconProps) => <Facebook {...props} />,
  Instagram: (props: IconProps) => <Instagram {...props} />,
  Linkedin: (props: IconProps) => <Linkedin {...props} />,
  Twitter: (props: IconProps) => <Twitter {...props} />,
  Youtube: (props: IconProps) => <Youtube {...props} />,
  
  // Form icons
  Mail: (props: IconProps) => <Mail {...props} />,
  Phone: (props: IconProps) => <Phone {...props} />,
  Save: (props: IconProps) => <Save {...props} />,
  Link: (props: IconProps) => <LinkIcon {...props} />,
  Image: (props: IconProps) => <Image {...props} />,
  
  // Media control icons
  Pause: (props: IconProps) => <Pause {...props} />,
  Play: (props: IconProps) => <Play {...props} />,
  PenSquare: (props: IconProps) => <PenSquare {...props} />,
  
  // Alert icons
  AlertTriangle: (props: IconProps) => <AlertTriangle {...props} />,
  Circle: (props: IconProps) => <Circle {...props} />,
};

