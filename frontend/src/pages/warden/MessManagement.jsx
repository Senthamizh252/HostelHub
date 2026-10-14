import { useState, useMemo } from 'react';
import {
  Utensils, Calendar, Star, MessageSquare, Edit2, Pencil, Check,
  Clock, Gift, ChevronRight, ChevronLeft, Search, Filter, Plus,
  Sun, Moon, Coffee, X, Sparkles, AlertCircle, CheckCircle2, ChevronDown
} from 'lucide-react';
import clsx from 'clsx';

// ─── Food Images & Avatars ───────────────────────────────────────────────────
const FOOD_IMAGES = {
  idli: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=160',
  sambar: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=160',
  egg: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=160',
  banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=160',
  rice: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=160',
  poriyal: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=160',
  curd: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&q=80&w=160',
  tea: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=160',
  biscuit: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=160',
  sprouts: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=160',
  chapati: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=160',
  chickenCurry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=160',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=160',
  lunchPlate: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=240',
};

// ─── Initial Weekly Menu Data ────────────────────────────────────────────────
const INITIAL_WEEKLY_MENU = {
  Monday: {
    breakfast: {
      time: '7:30 AM - 8:30 AM',
      tag: 'Healthy & Nutritious',
      items: [
        { name: 'Idli + Chutney', img: FOOD_IMAGES.idli },
        { name: 'Sambar', img: FOOD_IMAGES.sambar },
        { name: 'Boiled Egg', img: FOOD_IMAGES.egg },
        { name: 'Banana', img: FOOD_IMAGES.banana },
      ],
    },
    lunch: {
      time: '12:30 PM - 2:00 PM',
      tag: 'Balanced Meal',
      items: [
        { name: 'Rice', img: FOOD_IMAGES.rice },
        { name: 'Sambar', img: FOOD_IMAGES.sambar },
        { name: 'Poriyal', img: FOOD_IMAGES.poriyal },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
    snacks: {
      time: '4:00 PM - 5:00 PM',
      tag: 'Light & Healthy',
      items: [
        { name: 'Tea / Coffee', img: FOOD_IMAGES.tea },
        { name: 'Banana', img: FOOD_IMAGES.banana },
        { name: 'Biscuit', img: FOOD_IMAGES.biscuit },
        { name: 'Sprouts', img: FOOD_IMAGES.sprouts },
      ],
    },
    dinner: {
      time: '7:30 PM - 8:30 PM',
      tag: 'Wholesome Meal',
      items: [
        { name: 'Chapati', img: FOOD_IMAGES.chapati },
        { name: 'Chicken Curry', img: FOOD_IMAGES.chickenCurry },
        { name: 'Veg Salad', img: FOOD_IMAGES.salad },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
  },
  Tuesday: {
    breakfast: {
      time: '7:30 AM - 8:30 AM',
      tag: 'Healthy & Nutritious',
      items: [
        { name: 'Pongal + Chutney', img: FOOD_IMAGES.idli },
        { name: 'Sambar', img: FOOD_IMAGES.sambar },
        { name: 'Boiled Egg', img: FOOD_IMAGES.egg },
        { name: 'Banana', img: FOOD_IMAGES.banana },
      ],
    },
    lunch: {
      time: '12:30 PM - 2:00 PM',
      tag: 'Balanced Meal',
      items: [
        { name: 'Rice', img: FOOD_IMAGES.rice },
        { name: 'Rasam', img: FOOD_IMAGES.sambar },
        { name: 'Beans Poriyal', img: FOOD_IMAGES.poriyal },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
    snacks: {
      time: '4:00 PM - 5:00 PM',
      tag: 'Light & Healthy',
      items: [
        { name: 'Tea / Coffee', img: FOOD_IMAGES.tea },
        { name: 'Banana', img: FOOD_IMAGES.banana },
        { name: 'Samosa', img: FOOD_IMAGES.biscuit },
        { name: 'Sprouts', img: FOOD_IMAGES.sprouts },
      ],
    },
    dinner: {
      time: '7:30 PM - 8:30 PM',
      tag: 'Wholesome Meal',
      items: [
        { name: 'Chapati', img: FOOD_IMAGES.chapati },
        { name: 'Paneer Butter Masala', img: FOOD_IMAGES.chickenCurry },
        { name: 'Veg Salad', img: FOOD_IMAGES.salad },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
  },
  Wednesday: {
    breakfast: {
      time: '7:30 AM - 8:30 AM',
      tag: 'Healthy & Nutritious',
      items: [
        { name: 'Poori + Masala', img: FOOD_IMAGES.idli },
        { name: 'Sambar', img: FOOD_IMAGES.sambar },
        { name: 'Boiled Egg', img: FOOD_IMAGES.egg },
        { name: 'Apple', img: FOOD_IMAGES.banana },
      ],
    },
    lunch: {
      time: '12:30 PM - 2:00 PM',
      tag: 'Balanced Meal',
      items: [
        { name: 'Veg Biryani', img: FOOD_IMAGES.rice },
        { name: 'Raita', img: FOOD_IMAGES.curd },
        { name: 'Salad', img: FOOD_IMAGES.salad },
        { name: 'Papad', img: FOOD_IMAGES.biscuit },
      ],
    },
    snacks: {
      time: '4:00 PM - 5:00 PM',
      tag: 'Light & Healthy',
      items: [
        { name: 'Tea / Coffee', img: FOOD_IMAGES.tea },
        { name: 'Banana', img: FOOD_IMAGES.banana },
        { name: 'Cookies', img: FOOD_IMAGES.biscuit },
        { name: 'Boiled Corn', img: FOOD_IMAGES.sprouts },
      ],
    },
    dinner: {
      time: '7:30 PM - 8:30 PM',
      tag: 'Wholesome Meal',
      items: [
        { name: 'Chapati', img: FOOD_IMAGES.chapati },
        { name: 'Dal Fry', img: FOOD_IMAGES.chickenCurry },
        { name: 'Veg Salad', img: FOOD_IMAGES.salad },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
  },
  Thursday: {
    breakfast: {
      time: '7:30 AM - 8:30 AM',
      tag: 'Healthy & Nutritious',
      items: [
        { name: 'Dosa + Sambar', img: FOOD_IMAGES.idli },
        { name: 'Coconut Chutney', img: FOOD_IMAGES.curd },
        { name: 'Boiled Egg', img: FOOD_IMAGES.egg },
        { name: 'Banana', img: FOOD_IMAGES.banana },
      ],
    },
    lunch: {
      time: '12:30 PM - 2:00 PM',
      tag: 'Balanced Meal',
      items: [
        { name: 'Rice', img: FOOD_IMAGES.rice },
        { name: 'Sambar', img: FOOD_IMAGES.sambar },
        { name: 'Cabbage Poriyal', img: FOOD_IMAGES.poriyal },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
    snacks: {
      time: '4:00 PM - 5:00 PM',
      tag: 'Light & Healthy',
      items: [
        { name: 'Tea / Coffee', img: FOOD_IMAGES.tea },
        { name: 'Banana', img: FOOD_IMAGES.banana },
        { name: 'Rusk', img: FOOD_IMAGES.biscuit },
        { name: 'Sprouts', img: FOOD_IMAGES.sprouts },
      ],
    },
    dinner: {
      time: '7:30 PM - 8:30 PM',
      tag: 'Wholesome Meal',
      items: [
        { name: 'Chapati', img: FOOD_IMAGES.chapati },
        { name: 'Egg Curry / Veg Curry', img: FOOD_IMAGES.chickenCurry },
        { name: 'Veg Salad', img: FOOD_IMAGES.salad },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
  },
  Friday: {
    breakfast: {
      time: '7:30 AM - 8:30 AM',
      tag: 'Healthy & Nutritious',
      items: [
        { name: 'Idli + Vada', img: FOOD_IMAGES.idli },
        { name: 'Sambar', img: FOOD_IMAGES.sambar },
        { name: 'Chutney', img: FOOD_IMAGES.curd },
        { name: 'Banana', img: FOOD_IMAGES.banana },
      ],
    },
    lunch: {
      time: '12:30 PM - 2:00 PM',
      tag: 'Balanced Meal',
      items: [
        { name: 'Rice', img: FOOD_IMAGES.rice },
        { name: 'Tomato Rasam', img: FOOD_IMAGES.sambar },
        { name: 'Potato Fry', img: FOOD_IMAGES.poriyal },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
    snacks: {
      time: '4:00 PM - 5:00 PM',
      tag: 'Light & Healthy',
      items: [
        { name: 'Tea / Coffee', img: FOOD_IMAGES.tea },
        { name: 'Banana', img: FOOD_IMAGES.banana },
        { name: 'Biscuit', img: FOOD_IMAGES.biscuit },
        { name: 'Chana Sundal', img: FOOD_IMAGES.sprouts },
      ],
    },
    dinner: {
      time: '7:30 PM - 8:30 PM',
      tag: 'Wholesome Meal',
      items: [
        { name: 'Chapati', img: FOOD_IMAGES.chapati },
        { name: 'Chicken Curry / Paneer', img: FOOD_IMAGES.chickenCurry },
        { name: 'Veg Salad', img: FOOD_IMAGES.salad },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
  },
  Saturday: {
    breakfast: {
      time: '7:30 AM - 8:30 AM',
      tag: 'Healthy & Nutritious',
      items: [
        { name: 'Upma + Chutney', img: FOOD_IMAGES.idli },
        { name: 'Sambar', img: FOOD_IMAGES.sambar },
        { name: 'Boiled Egg', img: FOOD_IMAGES.egg },
        { name: 'Banana', img: FOOD_IMAGES.banana },
      ],
    },
    lunch: {
      time: '12:30 PM - 2:00 PM',
      tag: 'Balanced Meal',
      items: [
        { name: 'Lemon Rice & White Rice', img: FOOD_IMAGES.rice },
        { name: 'Sambar', img: FOOD_IMAGES.sambar },
        { name: 'Mixed Veg Curry', img: FOOD_IMAGES.poriyal },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
    snacks: {
      time: '4:00 PM - 5:00 PM',
      tag: 'Light & Healthy',
      items: [
        { name: 'Tea / Coffee', img: FOOD_IMAGES.tea },
        { name: 'Banana', img: FOOD_IMAGES.banana },
        { name: 'Puff / Biscuit', img: FOOD_IMAGES.biscuit },
        { name: 'Sprouts', img: FOOD_IMAGES.sprouts },
      ],
    },
    dinner: {
      time: '7:30 PM - 8:30 PM',
      tag: 'Wholesome Meal',
      items: [
        { name: 'Chapati', img: FOOD_IMAGES.chapati },
        { name: 'Kofta Curry', img: FOOD_IMAGES.chickenCurry },
        { name: 'Veg Salad', img: FOOD_IMAGES.salad },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
  },
  Sunday: {
    breakfast: {
      time: '8:00 AM - 9:30 AM',
      tag: 'Weekend Special',
      items: [
        { name: 'Masala Dosa', img: FOOD_IMAGES.idli },
        { name: 'Sambar + Chutneys', img: FOOD_IMAGES.sambar },
        { name: 'Boiled Egg / Sweet', img: FOOD_IMAGES.egg },
        { name: 'Banana', img: FOOD_IMAGES.banana },
      ],
    },
    lunch: {
      time: '12:30 PM - 2:30 PM',
      tag: 'Grand Feast',
      items: [
        { name: 'Chicken Biryani / Veg Pulao', img: FOOD_IMAGES.rice },
        { name: 'Gravy & Raita', img: FOOD_IMAGES.sambar },
        { name: 'Gulab Jamun', img: FOOD_IMAGES.poriyal },
        { name: 'Ice Cream', img: FOOD_IMAGES.curd },
      ],
    },
    snacks: {
      time: '4:30 PM - 5:30 PM',
      tag: 'Light & Healthy',
      items: [
        { name: 'Special Filter Coffee', img: FOOD_IMAGES.tea },
        { name: 'Banana', img: FOOD_IMAGES.banana },
        { name: 'Bakery Cookies', img: FOOD_IMAGES.biscuit },
        { name: 'Sprouts Salad', img: FOOD_IMAGES.sprouts },
      ],
    },
    dinner: {
      time: '7:30 PM - 8:30 PM',
      tag: 'Wholesome Meal',
      items: [
        { name: 'Chapati', img: FOOD_IMAGES.chapati },
        { name: 'Dal Tadka', img: FOOD_IMAGES.chickenCurry },
        { name: 'Fresh Salad', img: FOOD_IMAGES.salad },
        { name: 'Curd', img: FOOD_IMAGES.curd },
      ],
    },
  },
};

// ─── Initial Student Feedback Data ──────────────────────────────────────────
const INITIAL_FEEDBACK = [
  {
    id: 1,
    student: 'Ananya R',
    room: 'B-104',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    mealType: 'Lunch',
    rating: 5.0,
    comment: 'Food was really good today!',
    date: '26 Oct 2025',
  },
  {
    id: 2,
    student: 'Karthik S',
    room: 'A-203',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    mealType: 'Dinner',
    rating: 4.0,
    comment: 'Chicken curry was tasty.',
    date: '26 Oct 2025',
  },
  {
    id: 3,
    student: 'Sneha P',
    room: 'C-312',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120',
    mealType: 'Breakfast',
    rating: 4.5,
    comment: 'Idli was soft and fresh.',
    date: '25 Oct 2025',
  },
  {
    id: 4,
    student: 'Rohith M',
    room: 'B-110',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    mealType: 'Snacks',
    rating: 3.5,
    comment: 'Could be better.',
    date: '25 Oct 2025',
  },
  {
    id: 5,
    student: 'Priya N',
    room: 'A-108',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    mealType: 'Lunch',
    rating: 4.5,
    comment: 'Curd was very fresh and sambar was well seasoned.',
    date: '24 Oct 2025',
  },
  {
    id: 6,
    student: 'Vignesh K',
    room: 'D-204',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
    mealType: 'Dinner',
    rating: 4.0,
    comment: 'Hot chapatis served on time. Good job!',
    date: '24 Oct 2025',
  },
];

// ─── Cloche SVG Icon ──────────────────────────────────────────────────────────
function ClocheIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4v2" />
      <path d="M4 18h16" />
      <path d="M4 18a8 8 0 0 1 16 0" />
      <circle cx="12" cy="4" r="1" />
    </svg>
  );
}

// ─── Special Menu Decorative Illustration ────────────────────────────────────
function SpecialMenuIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 180 84" className={clsx('w-36 h-20 text-[#0F7A6B]', className)}>
      {/* Left decorative leaf branch */}
      <path
        d="M32 62 C38 46 48 36 60 30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
      <ellipse cx="32" cy="56" rx="4.5" ry="2.5" fill="currentColor" opacity="0.65" transform="rotate(-30 32 56)" />
      <ellipse cx="40" cy="45" rx="5" ry="2.8" fill="currentColor" opacity="0.75" transform="rotate(-25 40 45)" />
      <ellipse cx="49" cy="37" rx="4.5" ry="2.5" fill="currentColor" opacity="0.85" transform="rotate(-15 49 37)" />
      <ellipse cx="58" cy="31" rx="4" ry="2" fill="currentColor" opacity="0.9" transform="rotate(-5 58 31)" />

      {/* Right decorative leaf branch */}
      <path
        d="M148 62 C142 46 132 36 120 30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
      <ellipse cx="148" cy="56" rx="4.5" ry="2.5" fill="currentColor" opacity="0.65" transform="rotate(30 148 56)" />
      <ellipse cx="140" cy="45" rx="5" ry="2.8" fill="currentColor" opacity="0.75" transform="rotate(25 140 45)" />
      <ellipse cx="131" cy="37" rx="4.5" ry="2.5" fill="currentColor" opacity="0.85" transform="rotate(15 131 37)" />
      <ellipse cx="122" cy="31" rx="4" ry="2" fill="currentColor" opacity="0.9" transform="rotate(5 122 31)" />

      {/* Festive Bowl */}
      <ellipse cx="90" cy="52" rx="28" ry="11" fill="#E6F4F1" stroke="currentColor" strokeWidth="2" />
      <path d="M64 52 C66 70 114 70 116 52 Z" fill="#0F7A6B" opacity="0.9" />
      <ellipse cx="90" cy="47" rx="21" ry="8" fill="#C2E7DE" />

      {/* Food Mounds / Delicacies */}
      <circle cx="83" cy="45" r="4.5" fill="currentColor" opacity="0.5" />
      <circle cx="92" cy="43" r="5.5" fill="currentColor" opacity="0.7" />
      <circle cx="99" cy="45" r="4.5" fill="currentColor" opacity="0.6" />

      {/* Steam Wisps */}
      <path
        d="M85 36 C83 31 87 27 85 22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
      <path
        d="M95 34 C93 29 97 25 95 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
    </svg>
  );
}

// ─── Star Rating Helper ───────────────────────────────────────────────────────
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4 && rating % 1 <= 0.8;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-[#F59E0B]">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star size={13} className="text-[#F59E0B]" />
            <div className="absolute inset-0 overflow-hidden w-[50%]">
              <Star size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
            </div>
          </div>
        )}
        {Array.from({ length: Math.max(0, emptyStars) }).map((_, i) => (
          <Star key={`empty-${i}`} size={13} className="text-slate-200 fill-slate-100" />
        ))}
      </div>
      <span className="text-xs font-bold text-slate-700">{rating.toFixed(1)}</span>
    </div>
  );
}

// ─── Main MessManagement Component ───────────────────────────────────────────
export default function MessManagement() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [weeklyMenu, setWeeklyMenu] = useState(INITIAL_WEEKLY_MENU);
  const [studentFeedback, setStudentFeedback] = useState(INITIAL_FEEDBACK);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [mealFilter, setMealFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isSpecialMenuOpen, setIsSpecialMenuOpen] = useState(false);
  const [isTimingsOpen, setIsTimingsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Meal Timings State
  const [mealTimings, setMealTimings] = useState({
    breakfast: '7:30 - 8:30 AM',
    lunch: '12:30 - 2:00 PM',
    snacks: '4:00 - 5:00 PM',
    dinner: '7:30 - 8:30 PM',
  });

  // Scheduled Special Menu State (null = empty state)
  const [specialMenu, setSpecialMenu] = useState(null);

  // Temp form state for Edit Menu
  const [editMealDay, setEditMealDay] = useState('Monday');
  const [editMealType, setEditMealType] = useState('breakfast');
  const [editDishes, setEditDishes] = useState('');
  const [editTag, setEditTag] = useState('Healthy & Nutritious');

  // Temp form state for Special Menu
  const [specialForm, setSpecialForm] = useState({
    title: '',
    date: '',
    session: 'Lunch',
    items: '',
    notes: '',
  });

  // Days list
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Current Day's menu data
  const currentMenu = weeklyMenu[selectedDay] || weeklyMenu.Monday;

  // Filter feedback
  const filteredFeedback = useMemo(() => {
    return studentFeedback.filter((item) => {
      const matchName =
        item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.comment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchMeal = mealFilter === 'All' || item.mealType.toLowerCase() === mealFilter.toLowerCase();
      const matchRating =
        ratingFilter === 'All'
          ? true
          : ratingFilter === '5'
          ? item.rating === 5.0
          : ratingFilter === '4+'
          ? item.rating >= 4.0
          : ratingFilter === '3+'
          ? item.rating >= 3.0
          : true;
      return matchName && matchMeal && matchRating;
    });
  }, [studentFeedback, searchTerm, ratingFilter, mealFilter]);

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Edit Menu Modal
  const handleOpenEditMenu = () => {
    setEditMealDay(selectedDay);
    setEditMealType('breakfast');
    const itemsStr = (weeklyMenu[selectedDay]?.breakfast?.items || []).map((i) => i.name).join(', ');
    setEditDishes(itemsStr);
    setEditTag(weeklyMenu[selectedDay]?.breakfast?.tag || 'Healthy & Nutritious');
    setIsEditMenuOpen(true);
  };

  // When meal type switches inside Edit Modal
  const handleEditMealTypeChange = (newType) => {
    setEditMealType(newType);
    const itemsStr = (weeklyMenu[editMealDay]?.[newType]?.items || []).map((i) => i.name).join(', ');
    setEditDishes(itemsStr);
    setEditTag(weeklyMenu[editMealDay]?.[newType]?.tag || 'Healthy & Nutritious');
  };

  // Save Edit Menu
  const handleSaveMenu = (e) => {
    e.preventDefault();
    const dishList = editDishes
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    if (dishList.length === 0) {
      alert('Please enter at least one dish');
      return;
    }

    const updatedItems = dishList.map((dishName) => {
      const lower = dishName.toLowerCase();
      let img = FOOD_IMAGES.lunchPlate;
      if (lower.includes('idli') || lower.includes('dosa') || lower.includes('poori') || lower.includes('upma') || lower.includes('pongal')) img = FOOD_IMAGES.idli;
      else if (lower.includes('sambar') || lower.includes('rasam') || lower.includes('dal')) img = FOOD_IMAGES.sambar;
      else if (lower.includes('egg')) img = FOOD_IMAGES.egg;
      else if (lower.includes('banana') || lower.includes('fruit') || lower.includes('apple')) img = FOOD_IMAGES.banana;
      else if (lower.includes('rice') || lower.includes('biryani') || lower.includes('pulao')) img = FOOD_IMAGES.rice;
      else if (lower.includes('poriyal') || lower.includes('sabzi') || lower.includes('fry') || lower.includes('veg')) img = FOOD_IMAGES.poriyal;
      else if (lower.includes('curd') || lower.includes('raita')) img = FOOD_IMAGES.curd;
      else if (lower.includes('tea') || lower.includes('coffee')) img = FOOD_IMAGES.tea;
      else if (lower.includes('biscuit') || lower.includes('cookie') || lower.includes('rusk')) img = FOOD_IMAGES.biscuit;
      else if (lower.includes('sprout') || lower.includes('salad') || lower.includes('corn')) img = FOOD_IMAGES.sprouts;
      else if (lower.includes('chapati') || lower.includes('roti') || lower.includes('paratha')) img = FOOD_IMAGES.chapati;
      else if (lower.includes('chicken') || lower.includes('curry') || lower.includes('paneer')) img = FOOD_IMAGES.chickenCurry;

      return { name: dishName, img };
    });

    setWeeklyMenu((prev) => ({
      ...prev,
      [editMealDay]: {
        ...prev[editMealDay],
        [editMealType]: {
          ...prev[editMealDay][editMealType],
          tag: editTag,
          items: updatedItems,
        },
      },
    }));

    setIsEditMenuOpen(false);
    showToast(`Updated ${editMealType} menu for ${editMealDay} successfully!`);
  };

  // Publish Weekly Menu
  const handlePublishMenu = () => {
    setIsPublishModalOpen(false);
    showToast('Weekly Menu successfully published & broadcasted to students portal!');
  };

  // Save Special Menu
  const handleSaveSpecialMenu = (e) => {
    e.preventDefault();
    if (!specialForm.title || !specialForm.date) {
      alert('Please fill out the festival name and date');
      return;
    }
    setSpecialMenu({
      title: specialForm.title,
      date: specialForm.date,
      session: specialForm.session,
      items: specialForm.items || 'Diwali Special Feast & Sweets',
      notes: specialForm.notes,
    });
    setIsSpecialMenuOpen(false);
    showToast(`Special menu for "${specialForm.title}" scheduled!`);
  };

  // Save Timings
  const handleSaveTimings = (e) => {
    e.preventDefault();
    setIsTimingsOpen(false);
    showToast('Meal timings updated successfully!');
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F7A6B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-teal-600 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-teal-200 shrink-0" />
          <p className="text-xs font-semibold">{toastMessage}</p>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80">
            <X size={15} />
          </button>
        </div>
      )}

      {/* ─── 1. Header Section ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Badge Icon + Title */}
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0F7A6B] text-white flex items-center justify-center ring-4 ring-[#E6F4F1] shadow-xs shrink-0">
            <Utensils size={26} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Mess Management</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage daily meals, menu, timings and student feedback.
            </p>
          </div>
        </div>

        {/* Right: Date Pill */}
        <div className="self-start sm:self-auto flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
          <Calendar size={15} className="text-slate-600" />
          <span className="text-xs font-semibold text-slate-700">Mon, 27 Oct 2025</span>
        </div>
      </div>

      {/* ─── 2. Top Metric / KPI Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Today's Meals */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-4.5 flex items-center gap-3.5 hover:shadow-xs transition-shadow">
          <div className="w-11 h-11 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B] shrink-0">
            <Utensils size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-700">Today's Meals</p>
            <p className="text-2xl font-bold text-slate-900 leading-tight">4</p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">Breakfast · Lunch · Snacks · Dinner</p>
          </div>
        </div>

        {/* Card 2: Meals This Week */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-4.5 flex items-center gap-3.5 hover:shadow-xs transition-shadow">
          <div className="w-11 h-11 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B] shrink-0">
            <Calendar size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-700">Meals This Week</p>
            <p className="text-2xl font-bold text-slate-900 leading-tight">28</p>
            <p className="text-[11px] text-slate-400 mt-0.5">7 days × 4 meals</p>
          </div>
        </div>

        {/* Card 3: Average Rating */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-4.5 flex items-center gap-3.5 hover:shadow-xs transition-shadow">
          <div className="w-11 h-11 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B] shrink-0">
            <Star size={20} className="fill-[#0F7A6B] text-[#0F7A6B]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-700">Average Rating</p>
            <p className="text-2xl font-bold text-slate-900 leading-tight">
              4.2 <span className="text-sm font-normal text-slate-400">/ 5</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">from 124 reviews</p>
          </div>
        </div>

        {/* Card 4: Pending Feedback */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-4.5 flex items-center gap-3.5 hover:shadow-xs transition-shadow">
          <div className="w-11 h-11 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B] shrink-0">
            <MessageSquare size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-700">Pending Feedback</p>
            <p className="text-2xl font-bold text-slate-900 leading-tight">12</p>
            <p className="text-[11px] text-slate-400 mt-0.5">awaiting review</p>
          </div>
        </div>
      </div>

      {/* ─── 3. Main Two-Column Layout ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ─── Left Column (8 cols): Weekly Planner & Student Feedback ──────── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card A: Weekly Menu Planner */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 sm:p-6">
            {/* Header: Title, Subtitle & Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#0F7A6B] flex items-center justify-center shrink-0">
                  <Calendar size={17} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-800">Weekly Menu Planner</h2>
                  <p className="text-xs text-slate-400">View and manage meals for the week.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleOpenEditMenu}
                  className="border border-[#0F7A6B] text-[#0F7A6B] hover:bg-[#E6F4F1]/60 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Pencil size={13} />
                  <span>Edit Menu</span>
                </button>
                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className="bg-[#0F7A6B] hover:bg-[#0D6B5E] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Star size={13} className="fill-white" />
                  <span>Publish Menu</span>
                </button>
              </div>
            </div>

            {/* Day Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide pt-1">
              {days.map((day) => {
                const isActive = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={clsx(
                      'px-5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer',
                      isActive
                        ? 'bg-[#0F7A6B] text-white shadow-2xs'
                        : 'bg-[#E8F5F1] text-teal-900/80 hover:bg-[#D5EFE6]'
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* 4 Meal Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mt-5">
              {/* Meal 1: Breakfast */}
              <div className="bg-[#F8FAF9] rounded-2xl p-3.5 border border-slate-100/80 flex flex-col justify-between">
                <div>
                  {/* Top Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B]">
                      <Sun size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">Breakfast</p>
                      <p className="text-[10px] text-teal-700/80 font-medium">
                        {currentMenu.breakfast?.time || '7:30 AM - 8:30 AM'}
                      </p>
                    </div>
                  </div>

                  {/* Dishes List */}
                  <div className="space-y-2.5">
                    {currentMenu.breakfast?.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200/70 shadow-2xs shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = FOOD_IMAGES.idli;
                          }}
                        />
                        <span className="text-[11.5px] font-semibold text-slate-700 leading-tight">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="mt-4 pt-1">
                  <div className="bg-[#E8F5F1] text-teal-800 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center justify-center gap-1 w-full text-center">
                    <Check size={11} className="stroke-[3]" />
                    <span>{currentMenu.breakfast?.tag || 'Healthy & Nutritious'}</span>
                  </div>
                </div>
              </div>

              {/* Meal 2: Lunch */}
              <div className="bg-[#F8FAF9] rounded-2xl p-3.5 border border-slate-100/80 flex flex-col justify-between">
                <div>
                  {/* Top Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B]">
                      <Utensils size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">Lunch</p>
                      <p className="text-[10px] text-teal-700/80 font-medium">
                        {currentMenu.lunch?.time || '12:30 PM - 2:00 PM'}
                      </p>
                    </div>
                  </div>

                  {/* Dishes List */}
                  <div className="space-y-2.5">
                    {currentMenu.lunch?.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200/70 shadow-2xs shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = FOOD_IMAGES.rice;
                          }}
                        />
                        <span className="text-[11.5px] font-semibold text-slate-700 leading-tight">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="mt-4 pt-1">
                  <div className="bg-[#E8F5F1] text-teal-800 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center justify-center gap-1 w-full text-center">
                    <Check size={11} className="stroke-[3]" />
                    <span>{currentMenu.lunch?.tag || 'Balanced Meal'}</span>
                  </div>
                </div>
              </div>

              {/* Meal 3: Evening Snacks */}
              <div className="bg-[#F8FAF9] rounded-2xl p-3.5 border border-slate-100/80 flex flex-col justify-between">
                <div>
                  {/* Top Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B]">
                      <Coffee size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">Evening Snacks</p>
                      <p className="text-[10px] text-teal-700/80 font-medium">
                        {currentMenu.snacks?.time || '4:00 PM - 5:00 PM'}
                      </p>
                    </div>
                  </div>

                  {/* Dishes List */}
                  <div className="space-y-2.5">
                    {currentMenu.snacks?.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200/70 shadow-2xs shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = FOOD_IMAGES.tea;
                          }}
                        />
                        <span className="text-[11.5px] font-semibold text-slate-700 leading-tight">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="mt-4 pt-1">
                  <div className="bg-[#E8F5F1] text-teal-800 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center justify-center gap-1 w-full text-center">
                    <Check size={11} className="stroke-[3]" />
                    <span>{currentMenu.snacks?.tag || 'Light & Healthy'}</span>
                  </div>
                </div>
              </div>

              {/* Meal 4: Dinner */}
              <div className="bg-[#F8FAF9] rounded-2xl p-3.5 border border-slate-100/80 flex flex-col justify-between">
                <div>
                  {/* Top Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B]">
                      <Moon size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">Dinner</p>
                      <p className="text-[10px] text-teal-700/80 font-medium">
                        {currentMenu.dinner?.time || '7:30 PM - 8:30 PM'}
                      </p>
                    </div>
                  </div>

                  {/* Dishes List */}
                  <div className="space-y-2.5">
                    {currentMenu.dinner?.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200/70 shadow-2xs shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = FOOD_IMAGES.chapati;
                          }}
                        />
                        <span className="text-[11.5px] font-semibold text-slate-700 leading-tight">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="mt-4 pt-1">
                  <div className="bg-[#E8F5F1] text-teal-800 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center justify-center gap-1 w-full text-center">
                    <Check size={11} className="stroke-[3]" />
                    <span>{currentMenu.dinner?.tag || 'Wholesome Meal'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Student Feedback */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 sm:p-6">
            {/* Header: Title & Filter Button */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#0F7A6B] flex items-center justify-center shrink-0">
                  <MessageSquare size={17} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-800">Student Feedback</h2>
                  <p className="text-xs text-slate-400">Recent reviews from hostel students.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setRatingFilter('All');
                  setMealFilter('All');
                  showToast('Filters reset to default.');
                }}
                className="border border-slate-200 text-slate-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Filter size={13} className="text-slate-500" />
                <span>Filter</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 my-3">
              {/* Search by student name */}
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B] focus:bg-white transition-all"
                />
              </div>

              {/* All Ratings Dropdown */}
              <div className="relative sm:w-36">
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B] appearance-none cursor-pointer pr-8 font-medium"
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5.0 Rating</option>
                  <option value="4+">4.0 & above</option>
                  <option value="3+">3.0 & above</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* All Meals Dropdown */}
              <div className="relative sm:w-36">
                <select
                  value={mealFilter}
                  onChange={(e) => setMealFilter(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B] appearance-none cursor-pointer pr-8 font-medium"
                >
                  <option value="All">All Meals</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Feedback Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3">Meal Type</th>
                    <th className="py-2.5 px-3">Rating</th>
                    <th className="py-2.5 px-3">Comment</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredFeedback.slice(0, 4).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Student info */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.avatar}
                            alt={item.student}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{item.student}</p>
                            <p className="text-[11px] text-slate-400">{item.room}</p>
                          </div>
                        </div>
                      </td>

                      {/* Meal Type */}
                      <td className="py-3 px-3 font-medium text-slate-700">{item.mealType}</td>

                      {/* Rating Stars + Value */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <StarRating rating={item.rating} />
                      </td>

                      {/* Comment */}
                      <td className="py-3 px-3 text-slate-600 max-w-xs">{item.comment}</td>

                      {/* Date */}
                      <td className="py-3 px-3 text-slate-400 whitespace-nowrap text-[11px]">{item.date}</td>
                    </tr>
                  ))}
                  {filteredFeedback.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                        No student feedback matches your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-end gap-1.5 mt-4 pt-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                <ChevronLeft size={13} />
              </button>
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={clsx(
                    'w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer',
                    currentPage === pageNum
                      ? 'bg-[#0F7A6B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Right Column (4 cols): Today's Menu, Special Menu, Meal Timings ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card C: Today's Meal Menu */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ClocheIcon size={19} className="text-[#0F7A6B]" />
                <h3 className="font-bold text-slate-800 text-[14px]">Today's Meal Menu</h3>
              </div>
              <button
                onClick={() => setSelectedDay('Monday')}
                className="text-xs text-[#0F7A6B] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                View All &gt;
              </button>
            </div>

            {/* List of 4 Meals */}
            <div className="space-y-3">
              {/* Row 1: Breakfast */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={FOOD_IMAGES.idli}
                    alt="Breakfast"
                    className="w-11 h-11 rounded-xl object-cover shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">Breakfast</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">Idli + Chutney</p>
                  </div>
                </div>
                <div className="bg-[#E8F5F1] text-teal-800 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                  7:30 AM - 8:30 AM
                </div>
              </div>

              {/* Row 2: Lunch */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={FOOD_IMAGES.lunchPlate}
                    alt="Lunch"
                    className="w-11 h-11 rounded-xl object-cover shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">Lunch</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">Rice + Sambar + Poriyal</p>
                  </div>
                </div>
                <div className="bg-[#E8F5F1] text-teal-800 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                  12:30 PM - 2:00 PM
                </div>
              </div>

              {/* Row 3: Snacks */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={FOOD_IMAGES.tea}
                    alt="Snacks"
                    className="w-11 h-11 rounded-xl object-cover shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">Snacks</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">Tea + Banana + Biscuit</p>
                  </div>
                </div>
                <div className="bg-[#E8F5F1] text-teal-800 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                  4:00 PM - 5:00 PM
                </div>
              </div>

              {/* Row 4: Dinner */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={FOOD_IMAGES.chapati}
                    alt="Dinner"
                    className="w-11 h-11 rounded-xl object-cover shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">Dinner</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">Chapati + Chicken Curry</p>
                  </div>
                </div>
                <div className="bg-[#E8F5F1] text-teal-800 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                  7:30 PM - 8:30 PM
                </div>
              </div>
            </div>
          </div>

          {/* Card D: Special Menu */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5">
            {/* Header: Title, Subtitle & Add Button */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-[#0F7A6B]">
                  <Gift size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[14px] leading-tight">Special Menu</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Create special meals for festivals or events.</p>
                </div>
              </div>

              <button
                onClick={() => setIsSpecialMenuOpen(true)}
                className="bg-[#0F7A6B] hover:bg-[#0D6B5E] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors shrink-0 cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Special Menu</span>
              </button>
            </div>

            {/* Empty State or Scheduled Card */}
            {specialMenu ? (
              <div className="bg-[#F0FAF7] rounded-2xl p-4 border border-teal-100/60 relative mt-3">
                <div className="flex items-center justify-between">
                  <span className="bg-[#0F7A6B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {specialMenu.session} Special
                  </span>
                  <span className="text-[11px] font-semibold text-teal-800">{specialMenu.date}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mt-2">{specialMenu.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{specialMenu.items}</p>
                {specialMenu.notes && <p className="text-[11px] text-slate-400 italic mt-1">{specialMenu.notes}</p>}
                <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-teal-100">
                  <button
                    onClick={() => {
                      setSpecialMenu(null);
                      showToast('Special menu removed.');
                    }}
                    className="text-[11px] text-rose-600 font-semibold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#F0FAF7] rounded-2xl p-6 flex flex-col items-center justify-center text-center mt-3 border border-teal-50">
                <SpecialMenuIllustration />
                <p className="font-bold text-[#0F7A6B] text-xs mt-3">No special menu scheduled</p>
                <p className="text-[11px] text-slate-400 max-w-[210px] mt-1">
                  Add a special menu for upcoming events or festivals.
                </p>
              </div>
            )}
          </div>

          {/* Card E: Meal Timings */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#E6F4F1] flex items-center justify-center text-[#0F7A6B]">
                  <Clock size={15} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[14px] leading-tight">Meal Timings</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Manage serving times for each meal.</p>
                </div>
              </div>

              <button
                onClick={() => setIsTimingsOpen(true)}
                className="border border-slate-200 text-slate-700 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Pencil size={12} className="text-slate-500" />
                <span>Edit Timings</span>
              </button>
            </div>

            {/* 4 Timing Boxes in Row */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2 text-center">
                <p className="text-[10px] text-slate-400 font-medium">Breakfast</p>
                <p className="text-[10.5px] font-bold text-slate-800 mt-1 whitespace-nowrap">{mealTimings.breakfast}</p>
              </div>
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2 text-center">
                <p className="text-[10px] text-slate-400 font-medium">Lunch</p>
                <p className="text-[10.5px] font-bold text-slate-800 mt-1 whitespace-nowrap">{mealTimings.lunch}</p>
              </div>
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2 text-center">
                <p className="text-[10px] text-slate-400 font-medium">Snacks</p>
                <p className="text-[10.5px] font-bold text-slate-800 mt-1 whitespace-nowrap">{mealTimings.snacks}</p>
              </div>
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2 text-center">
                <p className="text-[10px] text-slate-400 font-medium">Dinner</p>
                <p className="text-[10.5px] font-bold text-slate-800 mt-1 whitespace-nowrap">{mealTimings.dinner}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL 1: Edit Menu Modal ────────────────────────────────────────── */}
      {isEditMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#0F7A6B] flex items-center justify-center">
                  <Pencil size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Edit Meal Menu</h3>
                  <p className="text-xs text-slate-400">Update dishes and nutrition tags.</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMenu} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Select Day */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Day of Week</label>
                  <select
                    value={editMealDay}
                    onChange={(e) => {
                      setEditMealDay(e.target.value);
                      const itemsStr = (weeklyMenu[e.target.value]?.[editMealType]?.items || [])
                        .map((i) => i.name)
                        .join(', ');
                      setEditDishes(itemsStr);
                      setEditTag(weeklyMenu[e.target.value]?.[editMealType]?.tag || 'Healthy & Nutritious');
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Meal Session */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Meal Session</label>
                  <select
                    value={editMealType}
                    onChange={(e) => handleEditMealTypeChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="snacks">Evening Snacks</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
              </div>

              {/* Nutrition Tag */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nutrition Badge</label>
                <select
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                >
                  <option value="Healthy & Nutritious">Healthy & Nutritious</option>
                  <option value="Balanced Meal">Balanced Meal</option>
                  <option value="Light & Healthy">Light & Healthy</option>
                  <option value="Wholesome Meal">Wholesome Meal</option>
                  <option value="High Protein">High Protein</option>
                  <option value="Grand Feast">Grand Feast</option>
                </select>
              </div>

              {/* Dishes (comma separated) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dishes & Items <span className="text-slate-400 font-normal">(comma-separated)</span>
                </label>
                <textarea
                  rows={3}
                  value={editDishes}
                  onChange={(e) => setEditDishes(e.target.value)}
                  placeholder="e.g. Idli + Chutney, Sambar, Boiled Egg, Banana"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditMenuOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F7A6B] hover:bg-[#0D6B5E] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: Publish Confirmation Modal ────────────────────────────── */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#0F7A6B] flex items-center justify-center mx-auto mb-3">
              <Star size={24} className="fill-[#0F7A6B]" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Publish Weekly Menu?</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              This will update the mess timetable on the student portal for all 7 days of the upcoming week.
            </p>

            <div className="bg-slate-50 rounded-xl p-3 my-4 border border-slate-100 text-left text-xs">
              <p className="font-semibold text-slate-700">Week: 27 Oct - 02 Nov 2025</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Total: 28 Meals across 7 days</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublishMenu}
                className="px-5 py-2 bg-[#0F7A6B] hover:bg-[#0D6B5E] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Yes, Publish Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: Add Special Menu Modal ─────────────────────────────────── */}
      {isSpecialMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#0F7A6B] flex items-center justify-center">
                  <Gift size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Add Special Feast Menu</h3>
                  <p className="text-xs text-slate-400">Festival or event catering.</p>
                </div>
              </div>
              <button
                onClick={() => setIsSpecialMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSpecialMenu} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Occasion / Event Name</label>
                <input
                  type="text"
                  placeholder="e.g. Diwali Grand Feast / Pongal Celebration"
                  value={specialForm.title}
                  onChange={(e) => setSpecialForm({ ...specialForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={specialForm.date}
                    onChange={(e) => setSpecialForm({ ...specialForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Session</label>
                  <select
                    value={specialForm.session}
                    onChange={(e) => setSpecialForm({ ...specialForm, session: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Special Dishes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Veg / Mutton Dum Biryani, Paneer Tikka, Gulab Jamun, Payasam"
                  value={specialForm.items}
                  onChange={(e) => setSpecialForm({ ...specialForm, items: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Instructions / Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Extra dining hall tokens provided at reception"
                  value={specialForm.notes}
                  onChange={(e) => setSpecialForm({ ...specialForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSpecialMenuOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F7A6B] hover:bg-[#0D6B5E] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Special Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 4: Edit Timings Modal ────────────────────────────────────── */}
      {isTimingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#0F7A6B] flex items-center justify-center">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Edit Serving Timings</h3>
                  <p className="text-xs text-slate-400">Configure mess meal windows.</p>
                </div>
              </div>
              <button
                onClick={() => setIsTimingsOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTimings} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Breakfast Timing</label>
                <input
                  type="text"
                  value={mealTimings.breakfast}
                  onChange={(e) => setMealTimings({ ...mealTimings, breakfast: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Lunch Timing</label>
                <input
                  type="text"
                  value={mealTimings.lunch}
                  onChange={(e) => setMealTimings({ ...mealTimings, lunch: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Evening Snacks Timing</label>
                <input
                  type="text"
                  value={mealTimings.snacks}
                  onChange={(e) => setMealTimings({ ...mealTimings, snacks: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dinner Timing</label>
                <input
                  type="text"
                  value={mealTimings.dinner}
                  onChange={(e) => setMealTimings({ ...mealTimings, dinner: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F7A6B]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTimingsOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F7A6B] hover:bg-[#0D6B5E] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Timings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
