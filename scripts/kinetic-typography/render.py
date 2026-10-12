"""Deterministic editorial type film. Python 3.11+, Pillow, numpy, imageio-ffmpeg.
Run: python render.py --output ../public/media
Uses macOS Helvetica Neue; override --font with a licensed compatible TTC.
"""
import argparse, functools, math, subprocess
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

W,H,FPS,DURATION=1080,1920,60,10.5
BG=(246,245,241); IVORY=(250,249,246); MUTED=(233,232,228)
INK=(102,97,90); SECOND=(128,122,114)
FONT='/System/Library/Fonts/HelveticaNeue.ttc'
def clamp(x): return max(0.,min(1.,x))
def prog(t,a,b): return clamp((t-a)/(b-a))
def ease(x): return 1-(1-clamp(x))**5
def smooth(x):
    x=clamp(x); return x*x*(3-2*x)
def mix(a,b,u): return a+(b-a)*u
def color(a,b,u): return tuple(round(mix(x,y,u)) for x,y in zip(a,b))

@functools.lru_cache(maxsize=512)
def sprite(text,size,bold=True,tracking=-2):
    # Render glyph masks at 2x for clean curves and fractional optical tracking.
    font=ImageFont.truetype(FONT,round(size*2),index=1 if bold else 10)
    widths=[font.getlength(c)/2 for c in text]
    width=sum(widths)+tracking*(len(text)-1)
    box=font.getbbox(text)
    im=Image.new('L',(math.ceil(width*2)+12,box[3]-box[1]+12),0)
    d=ImageDraw.Draw(im); x=6
    for c,v in zip(text,widths):
        d.text((x,6-box[1]),c,font=font,fill=255); x+=(v+tracking)*2
    return im,width+6,(box[3]-box[1])/2+6

def word(im,text,size,x,y,scale=1,alpha=1,bold=True,tracking=-2,ink=INK,clip=None):
    if alpha<=0 or scale<.005: return
    mask,sw,sh=sprite(text,size,bold,tracking)
    # Transform straight from the oversampled mask; never allocate giant wipe layers.
    k=2/scale; left=x-sw*scale/2; top=y-sh*scale/2
    box=(max(0,math.floor(left)),max(0,math.floor(top)),min(W,math.ceil(left+sw*scale)),min(H,math.ceil(top+sh*scale)))
    if clip: box=(max(box[0],clip[0]),max(box[1],clip[1]),min(box[2],clip[2]),min(box[3],clip[3]))
    l,t,r,b=map(int,box)
    if r<=l or b<=t:return
    crop=mask.transform((r-l,b-t),Image.Transform.AFFINE,(k,0,(l-left)*k,0,k,(t-top)*k),Image.Resampling.BICUBIC)
    if alpha<.999: crop=crop.point(lambda v:round(v*clamp(alpha)))
    im.paste(ink,(l,t,r,b),crop)

def label(im,text,y,alpha=1,x=540):
    word(im,text,34,x,y,alpha=alpha,bold=False,tracking=.4,ink=SECOND)

def frame(t):
    # Related portfolio surface tones interpolate through motion, never hard-cut.
    bg=color(BG,IVORY,smooth(prog(t,.70,1.00)))
    bg=color(bg,BG,smooth(prog(t,1.73,2.02)))
    bg=color(bg,MUTED,smooth(prog(t,5.65,6.05)))
    bg=color(bg,IVORY,smooth(prog(t,7.67,8.05)))
    bg=color(bg,BG,smooth(prog(t,10.12,10.50)))
    im=Image.new('RGB',(W,H),bg)
    # 01: quiet setup; large word grows into a pale typographic wipe.
    if t<.96:
        a=ease(prog(t,.02,.17))*(1-smooth(prog(t,.63,.77)))
        word(im,'Not Just',65,540,mix(730,705,ease(prog(t,.02,.2))),alpha=a,bold=False,tracking=-1)
        p=ease(prog(t,.12,.43)); out=prog(t,.66,.94)
        sc=mix(.25,1,p)*(1+11*out**3)
        word(im,'Interfaces.',188,540,905,scale=sc,alpha=p*(1-smooth(prog(t,.87,.95))),ink=color(INK,IVORY,smooth(out)))
    # 02: two-line upward mask reveal with a restrained 8px optical overshoot.
    if .82<=t<2.06:
        enter=ease(prog(t,.84,1.12)); leave=ease(prog(t,1.73,2.04))
        over=8*math.sin(math.pi*prog(t,.84,1.2))
        for txt,y,sign in [('Complete',818,-1),('Systems.',1015,1)]:
            word(im,txt,187,540+sign*1250*leave,y+220*(1-enter)-over,clip=(0,int(y-100),W,int(y+105)))
    # 03/04: linked opposing horizontal swipes. Labels arrive early and hold.
    if 1.80<=t<2.78:
        ent=ease(prog(t,1.82,2.06)); ex=prog(t,2.44,2.64)**2
        x=540+1200*(1-ent)-1400*ex
        word(im,'Frontend.',190,x,910)
        label(im,'React · TypeScript',1060,ent*(1-ease(prog(t,2.48,2.65))))
    if 2.52<=t<3.50:
        ent=ease(prog(t,2.61,2.83)); ex=prog(t,3.19,3.36)**2
        word(im,'Backend.',199,540-1250*(1-ent)+1300*ex,1010)
        label(im,'Node.js · Python',1160,ent*(1-ease(prog(t,3.25,3.42))))
    # 05: oversized impact resolves, then contracts into the next reveal.
    if 3.28<=t<4.25:
        ent=ease(prog(t,3.35,3.61)); ex=ease(prog(t,3.98,4.24))
        sc=mix(2.8,1,ent)*mix(1,.025,ex)
        word(im,'APIs.',340,540,900,scale=sc,alpha=ease(prog(t,3.34,3.42))*(1-ex))
    # 06: an invisible horizontal window reveals the large word bottom-up.
    if 4.02<=t<5.03:
        ent=ease(prog(t,4.05,4.33)); ex=ease(prog(t,4.80,5.02))
        word(im,'Databases.',167,540,960+175*(1-ent)-170*ex,alpha=1-ex,clip=(55,875,1025,1055))
        label(im,'PostgreSQL · MongoDB',1125,ent*(1-ex))
    # 07: 18ms letter staggering, preserving the final optical spacing exactly.
    if 4.83<=t<6.00:
        txt='Integrations.'; size=153; tracking=-2.5
        font=ImageFont.truetype(FONT,size*2,index=1)
        widths=[font.getlength(c)/2 for c in txt]
        total=sum(widths)+tracking*(len(txt)-1); x=(W-total)/2
        roll=ease(prog(t,5.66,5.99))
        # Uniform baseline is essential: cropped single-letter masks have varying heights.
        fullbox=font.getbbox(txt); baseline=945+(fullbox[3]-fullbox[1])/4-fullbox[3]/2
        for i,(c,w) in enumerate(zip(txt,widths)):
            e=ease(prog(t,4.85+i*.018,5.09+i*.018))
            cb=font.getbbox(c); cy=baseline+(cb[1]+cb[3])/4
            word(im,c,size,x+w/2,cy+135*(1-e)-280*roll,alpha=e*(1-roll),tracking=0,clip=(45,805,1035,1060))
            x+=w+tracking
    # 08: vertical roll continues through the same typographic window.
    if 5.66<=t<6.90:
        ent=ease(prog(t,5.70,6.04)); ex=prog(t,6.46,6.68)**2
        word(im,'Workflows.',178,540-1350*ex,940+280*(1-ent),clip=(0,815,W,1170))
    # 09: expanding emphasis, a long still hold, then a purposeful upward exit.
    if 6.55<=t<7.97:
        ent=ease(prog(t,6.67,6.97)); ex=ease(prog(t,7.69,7.96))
        word(im,'Automation.',166,540,943-380*ex,scale=mix(.46,1,ent),alpha=ent*(1-ex))
        label(im,'n8n · Webhooks',1110,ent*(1-ex))
    # 10: offset lines converge into one editorial lockup.
    if 7.70<=t<9.32:
        e1=ease(prog(t,7.74,8.11)); e2=ease(prog(t,7.86,8.23)); out=prog(t,8.97,9.17)**2
        word(im,'Everything',168,540-980*(1-e1)-1150*out,839-60*(1-e1),alpha=e1)
        word(im,'Connected.',168,540+980*(1-e2)+1150*out,1025+60*(1-e2),alpha=e2)
    # 11: calm closing statement, generous hold, then cream returns to the loop head.
    if t>=9.05:
        ent=ease(prog(t,9.17,9.49)); end=smooth(prog(t,10.16,10.49))
        word(im,'Built',230,540,806+65*(1-ent),alpha=ent*(1-end),scale=mix(.95,1,ent))
        word(im,'End To End.',164,540,1020+85*(1-ent),alpha=ent*(1-end),scale=mix(.95,1,ent))
    return im

MOVES=[(0,.44),(.64,1.24),(1.71,2.09),(2.43,2.85),(3.18,3.63),(3.97,4.35),(4.79,5.34),(5.65,6.06),(6.45,6.99),(7.68,8.25),(8.97,9.48),(10.15,10.5)]
def exposure(t):
    if not any(a<=t<=b for a,b in MOVES):return frame(t)
    # Seven actual sub-frame exposures, 220-degree shutter. Blur follows the motion.
    samples=[np.asarray(frame(max(0,min(DURATION,t+off/FPS))),dtype=np.float32) for off in np.linspace(-.3056,.3056,7)]
    return Image.fromarray(np.clip(np.mean(samples,axis=0)+.5,0,255).astype('uint8'))

def main():
    global FONT
    p=argparse.ArgumentParser(); p.add_argument('--output',default=str((Path(__file__).resolve().parents[2] if Path(__file__).resolve().parent.parent.name == 'scripts' else Path(__file__).resolve().parent.parent)/'public/media')); p.add_argument('--font',default=FONT); p.add_argument('--stills',action='store_true')
    args=p.parse_args(); FONT=args.font; out=Path(args.output); out.mkdir(parents=True,exist_ok=True)
    name='full-stack-engineering-automation'
    if args.stills:
        times=[.5,1.45,2.25,2.99,3.75,4.55,5.43,6.23,7.20,8.55,9.85]
        sheet=Image.new('RGB',(270*6,510*2),'#dedcd7'); d=ImageDraw.Draw(sheet)
        for i,t in enumerate(times):
            f=exposure(t); f.save(out/f'frame-{t:.2f}.png'); sheet.paste(f.resize((270,480),Image.Resampling.LANCZOS),((i%6)*270,(i//6)*510)); d.text(((i%6)*270+12,(i//6)*510+486),f'{t:.2f}s',fill=INK)
        sheet.save(out/'contact-sheet.jpg'); return
    ff=imageio_ffmpeg.get_ffmpeg_exe()
    command=[ff,'-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709',str(out/f'{name}.mp4')]
    log=open(out/'render.log','w'); proc=subprocess.Popen(command,stdin=subprocess.PIPE,stderr=log)
    for n in range(round(DURATION*FPS)):
        proc.stdin.write(exposure(n/FPS).tobytes())
        if n%60==0:print(f'Rendered {n}/{round(DURATION*FPS)} frames',flush=True)
    proc.stdin.close(); code=proc.wait(); log.close()
    if code:raise RuntimeError('Encoder failed; see render.log')
    frame(8.55).save(out/f'{name}-poster.webp',quality=95,method=6)
    print('Export complete.',flush=True)

if __name__=='__main__':main()
