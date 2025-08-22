
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import {
  Search,
  Building2,
  Users,
  NotebookPen,
  ChevronRight,
  MapPin,
  Globe,
  Rocket,
  Settings as SettingsIcon,
  RefreshCw,
} from "lucide-react";

const seedAccounts = [
  { id: "tdecu", name: "TDECU (Space City Financial)", state: "TX", charterType: "Credit Union", assetsBand: "$2–5B+", core: "Jack Henry (Episys)", digitalProvider: "Banno (Retail), OAO TBD", neoSignal: false, touched: true, lastEngagement: "2025-08-14", notes: ["Met Isaac Johnson & Michael Massey at Peter Luger; follow-up email planned.","Exploring OAO strategy; interest in AI & fraud tools."], contacts: [{ name: "Isaac Johnson", title: "President & CEO", dept: "Executive", strength: 2, lastTouch: "2025-08-14", next: "Intro meeting (30m)" },{ name: "Michael Massey", title: "President, TDECU Holdings", dept: "Strategy/Innovation", strength: 3, lastTouch: "2025-08-14", next: "Dinner follow-up email" },{ name: "CK Bhatia", title: "Chief Data Officer", dept: "Data/Analytics", strength: 1, lastTouch: null, next: "Request warm intro" }]},
];

const weeklyTickerSeed = [
  { date: "2025-08-14", text: "Met TDECU leadership (Isaac, Massey) at Peter Luger; plan follow-up email and intro to CDO (CK Bhatia)." },
];

const STATES = ["TX","LA","AR","TN","MS","AL","GA","FL","SC","NC","KY","OK"];

const fmtDate = (d?: string) => (d ? new Date(d).toLocaleDateString() : "—");

function useKPIs(accounts: any[]) {
  return useMemo(() => {
    const total = accounts.length;
    const touched = accounts.filter((a) => a.touched).length;
    const contacts = accounts.reduce((sum, a) => sum + (a.contacts?.length || 0), 0);
    const multiThreaded = accounts.filter((a) => (a.contacts?.length || 0) >= 3).length;
    const byState = STATES.map((s) => ({
      state: s,
      touched: accounts.filter((a) => a.state === s && a.touched).length,
      total: accounts.filter((a) => a.state === s).length,
    }));
    return { total, touched, coveragePct: total ? Math.round((touched / total) * 100) : 0, contacts, multiThreaded, byState };
  }, [accounts]);
}

function daysSince(dateStr?: string) {
  if (!dateStr) return 9999;
  const ms = Date.now() - new Date(dateStr).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function slug(s = "") {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Ticker({ items }: any) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-muted/60 border border-border">
      <div className="flex gap-8 py-2 whitespace-nowrap animate-[marquee_30s_linear_infinite] px-4">
        {items.map((n: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <span className="font-medium">{n.date}</span>
            <span>•</span>
            <span className="opacity-80">{n.text}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function KPIRadial({ label, value }: any) {
  const data = [{ name: label, value }];
  return (
    <div className="h-40">
      <ResponsiveContainer>
        <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={90 + (value / 100) * 360}>
          <RadialBar dataKey="value" cornerRadius={10} />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-xl font-semibold">{value}%</text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

function StateBar({ data }: any) {
  const chart = data.map((d: any) => ({ state: d.state, touched: d.touched }));
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <BarChart data={chart} margin={{ left: 12, right: 12, top: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="touched" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Leaderboard({ accounts, onOpen }: any) {
  const rows = [...accounts].sort((a, b) => (b.contacts?.length || 0) - (a.contacts?.length || 0)).slice(0, 8);
  return (
    <div className="space-y-2">
      {rows.map((a) => (
        <div key={a.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/40">
          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4 opacity-70" />
            <div>
              <div className="font-medium">{a.name}</div>
              <div className="text-xs opacity-70">{a.state} • {a.charterType} • Contacts: {a.contacts?.length || 0}</div>
            </div>
          </div>
          <Button variant="ghost" onClick={() => onOpen(a)}>View <ChevronRight className="ml-1 h-4 w-4" /></Button>
        </div>
      ))}
    </div>
  );
}

function AccountDialog({ open, onOpenChange, account }: any) {
  if (!account) return null;
  const groups = (account.contacts || []).reduce((acc: any, c: any) => {
    const key = c.dept || "Unknown";
    (acc[key] = acc[key] || []).push(c);
    return acc;
  }, {} as Record<string, any[]>);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{account.name}</DialogTitle>
          <DialogDescription>{account.state} • {account.charterType} • {account.assetsBand}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1">
            <CardHeader><CardTitle className="text-sm">Snapshot</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2 opacity-80"><Users className="h-4 w-4" /> Contacts: {account.contacts?.length || 0}</div>
              <div className="flex items-center gap-2 opacity-80"><NotebookPen className="h-4 w-4" /> Last Touch: {fmtDate(account.lastEngagement)}</div>
              <div className="flex items-center gap-2 opacity-80"><Globe className="h-4 w-4" /> Digital: {account.digitalProvider}</div>
              <div className="flex items-center gap-2 opacity-80"><MapPin className="h-4 w-4" /> Core: {account.core}</div>
              <div className="separator my-2" />
              <div className="space-y-2">
                <div className="text-xs font-medium">Notes</div>
                <ul className="list-disc pl-5 space-y-1 text-xs opacity-80">
                  {(account.notes || []).map((n: string, i: number) => (<li key={i}>{n}</li>))}
                </ul>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader><CardTitle className="text-sm">Account Map</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(groups).map(([dept, list]: any) => (
                  <div key={dept} className="rounded-lg border p-3">
                    <div className="text-xs font-semibold mb-2">{dept}</div>
                    <div className="space-y-2">
                      {list.map((c: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between rounded-md bg-muted/40 p-2">
                          <div>
                            <div className="text-sm font-medium">{c.name}</div>
                            <div className="text-xs opacity-70">{c.title}</div>
                            <div className="text-xs mt-1 opacity-70">Last: {fmtDate(c.lastTouch)} • Next: {c.next || "—"}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge>{["","Cold","Light","Warm","Strong","Champion"][c.strength || 1]}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button>Log Touch</Button>
          <Button variant="secondary">Add Contact</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function App(){
  const [accounts, setAccounts] = useState(seedAccounts as any[]);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [weekly, setWeekly] = useState(weeklyTickerSeed);
  const [settings, setSettings] = useState({ accountsUrl: "", contactsUrl: "", notesUrl: "", weeklyUrl: "https://docs.google.com/spreadsheets/d/14Z3WShBH6oErD_nIzpK5mEydoPlywi8qYq7BF2wpDdY/edit?gid=1222826862#gid=1222826862" });
  const [autoRefresh, setAutoRefresh] = useState(true);

  const kpis = useKPIs(accounts);
  const contactGoal = 800;

  const handleOpenAccount = (a:any) => { setActive(a); setOpen(true); };

  const toCsvExport = (url: string) => {
    if (!url) return [];
    const parts = url.split(",").map(s=>s.trim()).filter(Boolean);
    return parts.map((uStr) => {
      try {
        const u = new URL(uStr);
        if (u.hostname.includes("docs.google.com") && u.pathname.includes("/spreadsheets/")) {
          const docId = u.pathname.split("/")[3];
          const gid = u.hash.includes("gid=") ? u.hash.split("gid=")[1] : (u.searchParams.get("gid") || "0");
          return `https://docs.google.com/spreadsheets/d/${docId}/export?format=csv&id=${docId}&gid=${gid}`;
        }
      } catch {}
      return uStr;
    });
  };

  async function fetchAllCsv(urls: string[]) {
    const texts = await Promise.all(urls.map(async (u) => {
      try {
        const res = await fetch(u, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.text();
      } catch (e) {
        console.error("Fetch CSV failed", u, e);
        return "";
      }
    }));
    return texts.filter(Boolean);
  }

  function parseCSV(text: string){
    const rows: string[][] = [];
    let cur = "", inQuotes = false, row: string[] = [];
    for (let i=0;i<text.length;i++){
      const ch = text[i], next = text[i+1];
      if (ch === '"'){
        if (inQuotes && next === '"'){ cur += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (ch === ',' && !inQuotes){
        row.push(cur); cur = '';
      } else if ((ch === '\n' || ch === '\r') && !inQuotes){
        if (cur !== '' || row.length){ row.push(cur); rows.push(row); }
        if (ch === '\r' && next === '\n') i++;
        cur = ''; row = [];
      } else {
        cur += ch;
      }
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }

  function toObjects(csv: string){
    const rows = parseCSV(csv).filter(r => r.length && r.some(c => c && c.trim() !== ''));
    const headers = rows.shift()!.map(h => h.trim());
    return rows.map(r => Object.fromEntries(headers.map((h,i)=>[h,(r[i]||'').trim()])));
  }

  async function handleSync(){
    const accUrls = toCsvExport(settings.accountsUrl);
    const conUrls = toCsvExport(settings.contactsUrl);
    const noteUrls = toCsvExport(settings.notesUrl);
    const weekUrls = toCsvExport(settings.weeklyUrl);
    const [accCsvs, conCsvs, noteCsvs, weekCsvs] = await Promise.all([
      fetchAllCsv(accUrls), fetchAllCsv(conUrls), fetchAllCsv(noteUrls), fetchAllCsv(weekUrls)
    ]);
    const parseObjectsFromCsvs = (csvs:string[]) => csvs.flatMap(csv => toObjects(csv));

    let nextAccounts = accounts;
    if (accCsvs.length){
      const objs:any[] = parseObjectsFromCsvs(accCsvs);
      nextAccounts = objs.map((o:any)=>({
        id: o.id || slug(o.name), name: o.name, state: o.state, charterType: o.charterType, assetsBand: o.assetsBand,
        core: o.core, digitalProvider: o.digitalProvider, neoSignal: /true/i.test(o.neoSignal || ''),
        touched: /true/i.test(o.touched || ''), lastEngagement: o.lastEngagement || null, notes: [], contacts: []
      }));
    } else {
      nextAccounts = JSON.parse(JSON.stringify(nextAccounts));
      nextAccounts.forEach((a:any)=>{ a.notes = a.notes || []; a.contacts = a.contacts || []; });
    }

    if (conCsvs.length){
      const objs:any[] = parseObjectsFromCsvs(conCsvs);
      const byAcc:any = {};
      objs.forEach((o:any)=>{
        const acctId = o.accountId || slug(o.accountName || o.fi || o.account || '');
        if (!acctId) return;
        (byAcc[acctId] = byAcc[acctId] || []).push({
          accountId: acctId, name: o.name, title: o.title, dept: o.dept || 'Unknown',
          strength: parseInt(o.strength || '1',10), lastTouch: o.lastTouch || null, next: o.next || ''
        });
      });
      nextAccounts.forEach((a:any)=>{ if (byAcc[a.id]) a.contacts = byAcc[a.id]; });
    }

    if (noteCsvs.length){
      const objs:any[] = parseObjectsFromCsvs(noteCsvs);
      const byAcc:any = {};
      objs.forEach((o:any)=>{
        const acctId = o.accountId || slug(o.accountName || o.fi || o.account || '');
        if (!acctId) return;
        (byAcc[acctId] = byAcc[acctId] || []).push({ date: o.date || '', text: o.text || o.note || '' });
      });
      nextAccounts.forEach((a:any)=>{ if (byAcc[a.id]) a.notes = byAcc[a.id].map((n:any)=>`${n.text}`); });
    }

    if (weekCsvs.length){
      const objs:any[] = parseObjectsFromCsvs(weekCsvs);
      const items = objs.map((o:any)=>({ date: o.date || '', text: o.text || o.update || o.note || ''}))
        .filter(x=>x.text).sort((a,b)=> new Date(b.date) as any - new Date(a.date) as any).slice(0,30);
      if (items.length) setWeekly(items);
    }

    setAccounts(nextAccounts);
  }

  useEffect(()=>{
    if (!autoRefresh) return;
    const id = setInterval(()=>handleSync(), 5*60*1000);
    return ()=>clearInterval(id);
  },[autoRefresh, settings]);

  useEffect(()=>{ handleSync(); },[]);

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return accounts.filter(a =>
      !q || a.name.toLowerCase().includes(q) || (a.state||'').toLowerCase().includes(q) || (a.charterType||'').toLowerCase().includes(q)
    );
  },[accounts, query]);

  const kpi = useKPIs(accounts);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Backbase Sales Command Center</h1>
          <p className="text-sm opacity-70">Territory: TX • LA • MS • AL • GA • FL • SC • NC • KY • TN • AR • OK</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="" onClick={handleSync}><span className="mr-2">⟲</span>Sync from Google Sheets</Button>
          <Button variant={autoRefresh ? 'default':'secondary'} onClick={()=>setAutoRefresh(v=>!v)}>{autoRefresh?'Auto-Refresh: On':'Auto-Refresh: Off'}</Button>
        </div>
      </div>

      <Ticker items={weekly} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-sm">Account Coverage</CardTitle></CardHeader>
          <CardContent><KPIRadial label="Coverage" value={kpi.coveragePct}/><div className="text-xs opacity-70 text-center">{kpi.touched}/{kpi.total} accounts touched</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Contacts Reached</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{kpi.contacts.toLocaleString()}</div>
            <div className="text-xs opacity-70">Goal: 800</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Multithreaded</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-semibold">{kpi.multiThreaded}</div><div className="text-xs opacity-70">≥ 3 contacts at an FI</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Touches by State</CardTitle></CardHeader>
          <CardContent><StateBar data={kpi.byState}/></CardContent>
        </Card>
      </div>

      <div className="border rounded-2xl overflow-hidden">
        <div className="p-3 flex items-center gap-2">
          <input className="input flex-1" placeholder="Search accounts, state, charter…" value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
        <div className="separator" />
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="text-left">
                <th className="p-3 font-medium">FI</th>
                <th className="p-3 font-medium">State</th>
                <th className="p-3 font-medium">Charter</th>
                <th className="p-3 font-medium">Asset Band</th>
                <th className="p-3 font-medium">Contacts</th>
                <th className="p-3 font-medium">Touched</th>
                <th className="p-3 font-medium">Last Touch</th>
                <th className="p-3 font-medium">Next Step</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a:any)=>(
                <tr key={a.id} className="hover:bg-muted/40 cursor-pointer" onClick={()=>{setActive(a);setOpen(true);}}>
                  <td className="p-3">
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs opacity-70">{a.core} • {a.digitalProvider}</div>
                  </td>
                  <td className="p-3">{a.state}</td>
                  <td className="p-3">{a.charterType}</td>
                  <td className="p-3">{a.assetsBand}</td>
                  <td className="p-3">{a.contacts?.length || 0}</td>
                  <td className="p-3">{a.touched ? <Badge className="badge-default">Yes</Badge> : <Badge className="badge-secondary">No</Badge>}</td>
                  <td className="p-3">{fmtDate(a.lastEngagement)}</td>
                  <td className="p-3 text-xs opacity-80">{a.contacts?.[0]?.next || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AccountDialog open={open} onOpenChange={setOpen} account={active} />

      <div className="card">
        <div className="card-header"><div className="card-title">Settings</div></div>
        <div className="card-content space-y-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-medium mb-1">Accounts Sheet URL(s)</div>
              <input className="input w-full" placeholder="Paste Google Sheet tab URL(s), comma-separated" value={settings.accountsUrl} onChange={e=>setSettings(s=>({...s,accountsUrl:e.target.value}))}/>
            </div>
            <div>
              <div className="text-xs font-medium mb-1">Contacts Sheet URL(s)</div>
              <input className="input w-full" placeholder="Paste Google Sheet tab URL(s), comma-separated" value={settings.contactsUrl} onChange={e=>setSettings(s=>({...s,contactsUrl:e.target.value}))}/>
            </div>
            <div>
              <div className="text-xs font-medium mb-1">Notes Sheet URL(s)</div>
              <input className="input w-full" placeholder="Optional: Account notes; tab URL(s)" value={settings.notesUrl} onChange={e=>setSettings(s=>({...s,notesUrl:e.target.value}))}/>
            </div>
            <div>
              <div className="text-xs font-medium mb-1">Weekly Updates Sheet URL(s)</div>
              <input className="input w-full" placeholder="Ticker source; tab URL(s)" value={settings.weeklyUrl} onChange={e=>setSettings(s=>({...s,weeklyUrl:e.target.value}))}/>
            </div>
          </div>
          <div className="text-xs opacity-70">Paste one or more Google Sheets <b>tab</b> URLs (they contain #gid=...). We auto-convert to CSV for you.</div>
          <div className="flex gap-2">
            <Button onClick={handleSync}>Sync Now</Button>
            <Button variant="secondary" onClick={()=>setSettings({ accountsUrl:'',contactsUrl:'',notesUrl:'',weeklyUrl:''})}>Clear</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
