import { CustomerReview } from "@/types/CustomerReview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { format } from "date-fns";
import React from "react";

const CustomerReviewCard = ({ review }: { review: CustomerReview }) => {
  const { name, avatar, rating, title, comment, date } = review;
  return (
    <Card className="w-full max-w-md shadow-md rounded-2xl">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-sm font-semibold">{name}</CardTitle>
          <span className="text-xs text-muted-foreground">
            {format(new Date(date), "PPP")}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <h3 className="font-semibold text-base mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {comment}
        </p>
      </CardContent>
    </Card>
  );
};

export default CustomerReviewCard;
