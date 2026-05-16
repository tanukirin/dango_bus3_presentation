(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const progress = document.querySelector('.progress span');
  const notePanel = document.querySelector('.notes-panel');
  let index = 0;
  const clamp = (n) => Math.max(0, Math.min(slides.length - 1, n));
  function updateNotes(){
    const notes = slides[index].querySelector('.notes');
    if(notes){ notePanel.innerHTML = notes.innerHTML; }
  }
  function go(n){
    index = clamp(n);
    slides.forEach((s,i)=>{
      s.classList.toggle('active', i === index);
      const no = s.querySelector('.slide-no');
      if(no) no.textContent = `${i+1} / ${slides.length}`;
    });
    progress.style.width = `${((index+1)/slides.length)*100}%`;
    history.replaceState(null, '', `#${index+1}`);
    updateNotes();
  }
  function next(){ go(index+1); }
  function prev(){ go(index-1); }
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    if(e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    if(e.key === 'Home') { e.preventDefault(); go(0); }
    if(e.key === 'End') { e.preventDefault(); go(slides.length-1); }
    if(e.key.toLowerCase() === 'n') { notePanel.classList.toggle('show'); updateNotes(); }
    if(e.key.toLowerCase() === 'f') { document.documentElement.requestFullscreen?.(); }
  });
  document.querySelector('[data-next]')?.addEventListener('click', next);
  document.querySelector('[data-prev]')?.addEventListener('click', prev);
  document.querySelector('[data-notes]')?.addEventListener('click', () => { notePanel.classList.toggle('show'); updateNotes(); });
  const fromHash = Number(location.hash.replace('#',''));
  go(Number.isFinite(fromHash) && fromHash > 0 ? fromHash - 1 : 0);
})();
