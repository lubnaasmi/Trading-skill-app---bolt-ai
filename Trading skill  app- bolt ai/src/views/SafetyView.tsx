import { Shield, ShieldCheck, Users, Eye, Flag, Lock, MessageSquareWarning, HeartHandshake } from 'lucide-react';

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: 'Verified Teens Only',
    desc: 'Every profile is reviewed. We verify ages 13–19 to keep the community safe.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Eye,
    title: 'Public by Design',
    desc: 'All trades and messages are visible to moderators. Nothing is hidden.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Flag,
    title: 'One-Tap Report',
    desc: 'See something off? Report any message or profile instantly. We act within 24 hours.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Lock,
    title: 'No Private DMs',
    desc: 'All chat happens inside Bloom. No phone numbers or external links shared.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Users,
    title: 'Community Moderation',
    desc: 'Trusted teen moderators help keep conversations kind and on-topic.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: HeartHandshake,
    title: 'Swap with Confidence',
    desc: 'Rate your partner after every trade. Good ratings build trust over time.',
    color: 'bg-pink-50 text-pink-600',
  },
];

const guidelines = [
  'Always meet in public spaces like libraries or cafes.',
  'Bring a friend or tell someone where you\'re going.',
  'Never share personal info like your address or school.',
  'Trust your gut — if something feels off, say no.',
  'Keep all communication inside the app.',
];

export default function SafetyView() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-bloom-charcoal">Safety Center</h2>
        </div>
        <p className="text-sm font-body text-bloom-charcoal/50">
          Bloom is built on trust. Here is how we keep you safe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {safetyFeatures.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-bloom-charcoal mb-1">{feature.title}</h3>
              <p className="text-xs font-body text-bloom-charcoal/60 leading-relaxed">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      <div
        className="bg-white rounded-3xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <MessageSquareWarning className="w-5 h-5 text-bloom-coral" />
          <h3 className="font-heading font-bold text-lg text-bloom-charcoal">Safety Guidelines</h3>
        </div>
        <ul className="space-y-3">
          {guidelines.map((g, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-bloom-sunflower/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-heading font-bold text-bloom-charcoal">{i + 1}</span>
              </div>
              <p className="text-sm font-body text-bloom-charcoal/70">{g}</p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="text-center py-4"
      >
        <p className="text-xs font-body text-bloom-charcoal/40">
          Need help? Contact our safety team at safety@bloom.app
        </p>
      </div>
    </div>
  );
}
