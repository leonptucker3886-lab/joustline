// B1: LeonProfile stub. joust.html only calls LeonProfile.unlock(id).
// Safe defaults; if Leon's real profile script is loaded first, it wins.
(function(){
  if (window.LeonProfile) return;
  var KEY='leonprofile_unlocks', u={};
  try{u=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){u={}}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(u))}catch(e){}}
  window.LeonProfile={
    stub:true,
    unlock:function(id){if(!id||u[id])return false;u[id]=Date.now();save();return true},
    isUnlocked:function(id){return !!u[id]},
    list:function(){return Object.keys(u)}
  };
})();
