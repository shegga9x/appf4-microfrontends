import React, { useState } from 'react';


const Story: React.FC<any> = (props) => {
  const { story } = props;
  const { user } = story;
  // Use a map to track loading state for all images in this component
  const [imgLoadingMap, setImgLoadingMap] = useState<Record<string, boolean>>({
    gif: true,
    avatar: true,
  });

  const handleImgLoad = (key: string) => {
    setImgLoadingMap((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="relative h-48 w-28 cursor-pointer rounded-xl p-0 shadow flex flex-col items-center justify-end overflow-hidden bg-black">
      {imgLoadingMap.gif && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <span className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></span>
        </div>
      )}
      <img
        src={user.randomGif}
        alt="story-gif"
        className={`absolute inset-0 h-full w-full object-fill object-center transition-opacity duration-300 ${imgLoadingMap.gif ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => handleImgLoad('gif')}
      />
      <div className="absolute left-3 top-3">
        {imgLoadingMap.avatar && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <span className="loader border-2 border-t-2 border-gray-200 border-t-blue-500 rounded-full w-6 h-6 animate-spin"></span>
          </div>
        )}
        <img
          src={user.dp}
          className={`h-10 w-10 rounded-full border-4 border-white dark:border-neutral-800 object-cover transition-opacity duration-300 ${imgLoadingMap.avatar ? 'opacity-0' : 'opacity-100'}`}
          alt="story"
          onLoad={() => handleImgLoad('avatar')}
        />
      </div>
      <div className="absolute w-full text-center" style={{ bottom: '5%' }}>
        <p className="font-semibold text-white">{user.fullName}</p>
      </div>
    </div>
  );
};

export default Story;