import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const EmbeddedTimeline = () => {
  return (
    <TwitterTimelineEmbed
      sourceType='timeline'
      screenName='NYTGames'
      options={{ width: '100%' }}
      autoHeight={true}
      noBorders={true}
      placeholder={
        <div className='h-full w-full flex flex-col justify-center items-center'>
          <CircularProgress className='text-indigo-600' />
          <h4 className='mt-2 text-indigo-600 font-bold'>
            Loading timeline ...
          </h4>
        </div>
      }
    />
  );
};

export default EmbeddedTimeline;
