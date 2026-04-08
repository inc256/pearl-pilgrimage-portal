import { Users } from "lucide-react";

const team = [
  { name: "Sheikh Ahmad Kakooza", role: "Founder & CEO", initials: "AK" },
  { name: "Hajjat Fatimah Namubiru", role: "Operations Director", initials: "FN" },
  { name: "Ustadh Ibrahim Ssemakula", role: "Religious Guide", initials: "IS" },
  { name: "Sarah Nakamya", role: "Client Relations Manager", initials: "SN" },
];

const TeamSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Our People</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Meet the Team</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="font-heading text-xl font-bold text-primary">{member.initials}</span>
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground">{member.name}</h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
