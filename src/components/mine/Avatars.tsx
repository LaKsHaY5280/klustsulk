"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Avatars = () => {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];

  return (
    <div>
      <p>User currently active</p>
      <div className="flex -space-x-3">
        {all.map((other, idx) => (
          <TooltipProvider key={other.id + idx}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src={other.info.avatar} />
                  <AvatarFallback>
                    {other.info.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-2">
                  <p>{other.info.name}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
export default Avatars;
