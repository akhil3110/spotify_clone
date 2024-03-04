export default function MilliSecondsToMinutes(milliseconds) {

    let totalSeconds = Math.floor(milliseconds / 1000);
  
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
  
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
  
    return minutes + ':' + seconds;
  }