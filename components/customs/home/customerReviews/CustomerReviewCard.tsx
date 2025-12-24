import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { format } from "date-fns";
import React from "react";

const CustomerReviewCard = ({ review }: { review: any }) => {
  const {
    userName,
    userImage,
    rating,
    title,
    comment,
    date,
    productName,
    // fallback for compatibility
    name,
    avatar
  } = review;

  const displayName = userName || name;
  const displayImage = userImage || avatar;

  return (
    <Card className="h-full group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white">
      <div className="absolute top-0 left-0 w-2 h-full bg-red-600 transition-transform origin-left"></div>

      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Avatar className="h-14 w-14 ring-4 ring-gray-100 group-hover:ring-red-50 transition-all">
          <AvatarImage src={displayImage} alt={displayName} className="object-cover" />
          <AvatarFallback className="bg-red-100 text-red-600 font-bold text-lg">
            {displayName?.[0] || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-gray-900 leading-tight">{displayName}</h4>
          <span className="text-sm text-gray-500 font-medium">
            {date ? format(new Date(date), "MMM d, yyyy") : "Recent Buyer"}
          </span>
        </div>
        <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100 group-hover:text-red-50 transition-colors pointer-events-none" />
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                }`}
            />
          ))}
        </div>

        {productName && (
          <div className="inline-block px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-3">
            Bought: {productName}
          </div>
        )}

        <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-1 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-base italic line-clamp-4">
          "{comment}"
        </p>
      </CardContent>
    </Card>
  );
};

export default CustomerReviewCard;
