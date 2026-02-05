import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CommunityGuide() {
  const [selectedSection, setSelectedSection] = useState('online');

  const communityData = {
    online: {
      name: 'Online Communities',
      icon: 'globe',
      color: 'blue',
      platforms: [
        {
          platform: 'Reddit',
          icon: 'logo-reddit',
          subreddits: [
            {
              name: 'r/powerlifting',
              size: '300k+ members',
              focus: 'Competition powerlifting discussion',
              pros: [
                'High quality discussion',
                'Meet reports and competition info',
                'Knowledgeable community',
                'Good form checks',
                'Programming advice',
              ],
              cons: [
                'Can be elitist',
                'Don\'t post low-effort content',
                'Read rules carefully',
                'Form checks in daily thread only',
              ],
              bestFor: 'Serious lifters and competitors',
            },
            {
              name: 'r/fitness',
              size: '10M+ members',
              focus: 'General fitness, beginners welcome',
              pros: [
                'Huge community',
                'Wiki is excellent resource',
                'Beginner friendly',
                'Program reviews',
                'Active daily threads',
              ],
              cons: [
                'Less powerlifting specific',
                'Some misinformation',
                'Repetitive questions',
                'Can be overwhelming',
              ],
              bestFor: 'Beginners and general strength',
            },
            {
              name: 'r/weightroom',
              size: '400k+ members',
              focus: 'Serious strength training',
              pros: [
                'High quality discussion',
                'Program party threads',
                'Excellent moderators',
                'Good training logs',
                'Science-based',
              ],
              cons: [
                'Less beginner friendly',
                'Strict posting rules',
                'Can be technical',
                'Form checks discouraged',
              ],
              bestFor: 'Intermediate to advanced lifters',
            },
          ],
        },
        {
          platform: 'Instagram',
          icon: 'logo-instagram',
          tips: [
            {
              tip: 'Follow Quality Coaches',
              accounts: [
                '@strongerbyscience (Greg Nuckols - science)',
                '@squat_university (Dr. Aaron Horschig - mobility/form)',
                '@kizen_training (Team - programming)',
                '@Calgary_barbell (Bryce Lewis - coaching)',
                '@massenomics (Humor + strength)',
                '@reactivetrainingsystems (Mike Tuchscherer - RPE)',
              ],
            },
            {
              tip: 'Avoid Fitfluencers',
              redFlags: [
                'Selling before teaching',
                'Extraordinary claims',
                'Fake natty with programs',
                'Constant supplement pushing',
                'No credentials or competition history',
                'Drama and call-outs',
              ],
            },
            {
              tip: 'Use Hashtags',
              hashtags: [
                '#powerlifting',
                '#powerliftingmotivation',
                '#squatbench deadlift',
                '#strengthtraining',
                'Your federation (#usapl, #uspa, etc.)',
                'Your gym location (#[city]powerlifting)',
              ],
            },
          ],
        },
        {
          platform: 'YouTube',
          icon: 'logo-youtube',
          channels: [
            {
              name: 'Alexander Bromley',
              focus: 'Programming philosophy',
              why: 'Deep dives into training theory',
            },
            {
              name: 'Calgary Barbell',
              focus: 'Technique and coaching',
              why: 'Excellent form breakdowns',
            },
            {
              name: 'Juggernaut Training Systems',
              focus: 'Elite coaching content',
              why: 'Pro lifter insights',
            },
            {
              name: 'Kabuki Strength',
              focus: 'Movement and equipment',
              why: 'Science-based approach',
            },
            {
              name: 'EliteFTS',
              focus: 'Westside method and equipped',
              why: 'Classic strength knowledge',
            },
          ],
        },
        {
          platform: 'Forums',
          icon: 'chatbox-ellipses',
          sites: [
            {
              name: 'StartingStrength Forums',
              url: 'startingstrength.com/resources/forum',
              focus: 'LP and novice programming',
              pros: 'Excellent beginner coaching',
              cons: 'Can be dogmatic about SS',
            },
            {
              name: 'StrongerByScience Forums',
              url: 'forum.strongerbyscience.com',
              focus: 'Evidence-based training',
              pros: 'High quality discussion',
              cons: 'Newer, smaller community',
            },
            {
              name: 'PowerliftingWatch',
              url: 'powerliftingwatch.com/forum',
              focus: 'Competition and records',
              pros: 'Competition info and rankings',
              cons: 'Less active than before',
            },
          ],
        },
      ],
    },
    local: {
      name: 'Local Community',
      icon: 'location',
      color: 'emerald',
      options: [
        {
          option: 'Powerlifting Gyms',
          icon: 'barbell',
          benefits: [
            'Built-in community of serious lifters',
            'Coaching usually available',
            'Competition equipment',
            'Supportive atmosphere',
            'Meet other competitors',
            'Learn from stronger lifters',
          ],
          howToFind: [
            'Google "[your city] powerlifting gym"',
            'Check OpenPowerlifting for local lifters',
            'Ask on city subreddit',
            'Look for "strength" or "barbell" in gym names',
            'Visit stronglifts gym finder',
          ],
          cost: '$50-150/month typically',
          worth: 'Absolutely if serious about powerlifting',
        },
        {
          option: 'Barbell Clubs',
          icon: 'people',
          benefits: [
            'Often cheaper than gym membership',
            'Community-focused',
            'Regular meets and events',
            'Group training sessions',
            'Social aspect strong',
          ],
          howToFind: [
            'Search Facebook for "[city] barbell club"',
            'Ask at local powerlifting gyms',
            'Check USAPL/USPA state pages',
            'Look for university barbell clubs',
          ],
          typical: 'Meet 2-3x per week, often in garage or warehouse',
        },
        {
          option: 'Competitions',
          icon: 'trophy',
          whyAttend: [
            'Meet other lifters in your area',
            'See different styles and techniques',
            'Build friendships through shared experience',
            'Learn from watching others',
            'Get inspired and motivated',
            'Exchange contacts for training partners',
          ],
          evenIfNotCompeting: [
            'Volunteer to help run meet',
            'Spectate and cheer',
            'Talk to lifters after their flights',
            'Network with coaches',
          ],
          frequency: 'Try to do 1-2 meets per year minimum',
        },
        {
          option: 'Seminars & Workshops',
          icon: 'school',
          types: [
            'Technique seminars (squat clinic, etc.)',
            'Programming workshops',
            'Meet prep courses',
            'Equipment workshops (wraps, belts, etc.)',
            'Judging/refereeing courses',
          ],
          benefits: [
            'Learn from experts',
            'Hands-on coaching',
            'Meet other serious lifters',
            'Networking with coaches',
            'Often affordable ($50-200)',
          ],
          howToFind: [
            'Check gym Instagram/Facebook pages',
            'Follow local coaches',
            'Federation websites (USAPL clinics)',
            'StrongerByScience sometimes hosts',
          ],
        },
      ],
    },
    culture: {
      name: 'Community Culture',
      icon: 'heart',
      color: 'purple',
      aspects: [
        {
          aspect: 'Supportive vs. Competitive',
          explanation: 'Powerlifting community is unique - competitive on platform, supportive everywhere else.',
          examples: [
            'Competitors cheering for each other at meets',
            'Sharing gear (wraps, belts) with rivals',
            'Experienced lifters coaching beginners',
            'Celebrating others\' PRs like your own',
            'No gatekeeping - everyone wants you to succeed',
          ],
          why: [
            'You compete against the bar, not the person',
            'Everyone remembers being weak',
            'Rising tide lifts all boats',
            'Community is small, stay connected',
            'What goes around comes around',
          ],
        },
        {
          aspect: 'Learning Culture',
          explanation: 'Powerlifting values continuous learning and experimentation.',
          values: [
            'Admitting you don\'t know',
            'Trying new approaches',
            'Sharing what works and doesn\'t',
            'Reading and researching',
            'Questioning dogma',
            'Being evidence-based',
          ],
          avoid: [
            'Acting like you know everything',
            'Dismissing others\' methods',
            'Being dogmatic about one approach',
            'Refusing to adapt',
            'Ego over learning',
          ],
        },
        {
          aspect: 'Respect for the Grind',
          explanation: 'Community respects hard work over talent.',
          celebrated: [
            'Consistency over years',
            'Coming back from injury',
            'Slow progress through plateaus',
            'Competing as masters lifter',
            'Helping others while pursuing your goals',
          ],
          notCelebrated: [
            'Genetic freaks who don\'t work hard',
            'Shortcuts (PEDs without honesty)',
            'Disrespecting the sport',
            'Ego lifting',
          ],
        },
        {
          aspect: 'Inclusivity',
          explanation: 'Modern powerlifting is increasingly diverse and welcoming.',
          progress: [
            'More women competing than ever',
            'All ages (teens to 80+)',
            'All body types',
            'LGBTQ+ lifters welcomed',
            'Disability divisions',
            'Every strength level from beginner to elite',
          ],
          stillIssues: [
            'Some gyms still "bro" culture',
            'Gender equity improving but not perfect',
            'Accessibility varies by location',
            'Need more diversity in coaching/leadership',
          ],
          bePartOfSolution: [
            'Welcome new people warmly',
            'Call out inappropriate behavior',
            'Support underrepresented lifters',
            'Create inclusive gym culture',
          ],
        },
      ],
    },
    contributing: {
      name: 'Give Back',
      icon: 'gift',
      color: 'red',
      ways: [
        {
          way: 'Volunteer at Meets',
          roles: [
            'Spotter/Loader (easiest to start)',
            'Expeditor (call lifters to warm-up)',
            'Runner (bring cards to announcer)',
            'Score table help',
            'Set up/tear down equipment',
          ],
          benefits: [
            'Free meet entry often',
            'See competition up close',
            'Meet organizers and refs',
            'Learn how meets run',
            'Give back to community',
            'Required hours for some certifications',
          ],
          howTo: 'Contact meet director, usually posted with meet info',
        },
        {
          way: 'Become a Referee',
          why: [
            'Sport needs more qualified refs',
            'Improves your understanding of rules',
            'Meet more people in community',
            'Can judge local, regional, national meets',
            'Usually compensated at bigger meets',
          ],
          process: [
            'Attend federation referee clinic',
            'Pass written exam',
            'Complete practical evaluation',
            'Maintain certification (judging X meets/year)',
          ],
          time: '2-day clinic usually, minimal ongoing time',
        },
        {
          way: 'Mentor Beginners',
          how: [
            'Answer questions in gym',
            'Offer to film lifts',
            'Share resources (articles, videos)',
            'Be encouraging and supportive',
            'Invite to train together',
          ],
          remember: [
            'You were a beginner once',
            'Don\'t force advice',
            'Be humble about knowledge',
            'Point to good resources',
            'Encourage consistency',
          ],
        },
        {
          way: 'Create Content',
          types: [
            'Training logs (YouTube, blog, Instagram)',
            'Meet reports and reviews',
            'Program reviews',
            'Technique tips',
            'Equipment reviews',
            'Motivational content',
          ],
          tips: [
            'Focus on YOUR experience',
            'Be honest about what works and doesn\'t',
            'Don\'t pretend to be expert',
            'Share journey, not just highlights',
            'Engage with comments',
          ],
          why: 'Helps others, documents your progress, builds connections',
        },
        {
          way: 'Support the Sport',
          actions: [
            'Compete (entry fees fund federations)',
            'Buy from powerlifting brands',
            'Attend meets as spectator',
            'Share and promote events',
            'Join federation as member',
            'Donate to non-profit orgs',
          ],
        },
      ],
    },
    toxicity: {
      name: 'Avoiding Toxicity',
      icon: 'warning',
      color: 'amber',
      redFlags: [
        {
          flag: 'Gear Shaming',
          examples: [
            '"Raw is the only real powerlifting"',
            '"Equipped lifting is cheating"',
            '"Sleeves are basically cheating"',
            '"If you use wraps you\'re not raw"',
          ],
          reality: 'Different equipment divisions, all valid. Compete how you want.',
          avoid: 'People who gatekeep equipment choices',
        },
        {
          flag: 'Federation Wars',
          examples: [
            '"Only USAPL is real powerlifting"',
            '"Drug-tested is for weak people"',
            '"Your federation records don\'t count"',
            'Constant arguing about best federation',
          ],
          reality: 'Different federations serve different goals. All have value.',
          avoid: 'People obsessed with federation superiority',
        },
        {
          flag: 'Natty Police',
          examples: [
            'Accusing everyone stronger of PEDs',
            'Calling people fake natty',
            'Acting morally superior for being natural',
            'Dismissing enhanced lifters\' hard work',
          ],
          reality: 'Drug use exists. Some test, some don\'t. Focus on yourself.',
          avoid: 'People obsessed with others\' drug status',
        },
        {
          flag: 'Program Cultists',
          examples: [
            '"Only Starting Strength works"',
            '"If you\'re not doing Conjugate you\'re wasting time"',
            '"Linear periodization is outdated"',
            'Attacking anyone doing different method',
          ],
          reality: 'Many programs work. Individual variation matters.',
          avoid: 'People who think their way is only way',
        },
        {
          flag: 'Ego Lifters',
          examples: [
            'Half repping and claiming PR',
            'Lying about lift numbers',
            'Refusing to take advice',
            'Mocking weaker lifters',
            'All talk, no competition',
          ],
          reality: 'Ego is enemy of progress',
          avoid: 'People more concerned with image than improvement',
        },
        {
          flag: 'Negative Nancy',
          examples: [
            'Constantly complaining',
            'Putting down others\' success',
            'Blaming everything external',
            'Never happy with own progress',
            'Spreading negativity',
          ],
          reality: 'Negative mindset is contagious',
          avoid: 'People who drain your energy and motivation',
        },
      ],
      healthySigns: [
        'Respectful of all federations and divisions',
        'Supportive of others regardless of strength',
        'Admits when they don\'t know something',
        'Willing to learn and adapt',
        'Competes regularly or doesn\'t claim expertise',
        'Positive and encouraging',
        'Focuses on own progress',
        'Gives credit where due',
      ],
    },
  };

  const currentSection = communityData[selectedSection as keyof typeof communityData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      emerald: 'bg-primary',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      amber: 'bg-amber-500',
    };
    return colors[color];
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Community Guide
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Find Your Tribe</Text>
            <Text className="text-white opacity-90">
              Connect with the powerlifting community
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(communityData).map(([key, section]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedSection(key)}
                  className={`${
                    selectedSection === key 
                      ? getColorClass(section.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedSection === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={section.icon as any} 
                    size={32} 
                    color={selectedSection === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedSection === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {section.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedSection === 'online' && currentSection.platforms?.map((platform: any, idx: number) => (
            <View key={idx} className="mb-6">
              <View className="flex-row items-center mb-4">
                <Ionicons name={platform.icon} size={32} color="#9D12DE" />
                <Text className="text-primary/80 text-2xl font-bold ml-3">{platform.platform}</Text>
              </View>

              {platform.subreddits?.map((sub: any, sIdx: number) => (
                <View key={sIdx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <Text className="text-white text-xl font-bold mb-1">{sub.name}</Text>
                  <Text className="text-zinc-400 text-sm mb-3">{sub.size} â€¢ {sub.focus}</Text>

                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-3">
                    <Text className="text-primary font-bold mb-2">Pros:</Text>
                    {sub.pros.map((pro: string, pIdx: number) => (
                      <Text key={pIdx} className="text-primary/80 text-sm mb-1">â€¢ {pro}</Text>
                    ))}
                  </View>

                  <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 mb-3">
                    <Text className="text-red-400 font-bold mb-2">Cons:</Text>
                    {sub.cons.map((con: string, cIdx: number) => (
                      <Text key={cIdx} className="text-red-300 text-sm mb-1">â€¢ {con}</Text>
                    ))}
                  </View>

                  <View className="bg-primary/10 rounded-xl p-2 border border-primary/30">
                    <Text className="text-primary/60 text-sm">Best for: {sub.bestFor}</Text>
                  </View>
                </View>
              ))}

              {platform.tips?.map((tipSection: any, tIdx: number) => (
                <View key={tIdx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <Text className="text-purple-400 text-lg font-bold mb-3">{tipSection.tip}</Text>
                  
                  {tipSection.accounts && tipSection.accounts.map((account: string, aIdx: number) => (
                    <Text key={aIdx} className="text-zinc-300 text-sm mb-2">â€¢ {account}</Text>
                  ))}
                  
                  {tipSection.redFlags && (
                    <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 mt-2">
                      <Text className="text-red-400 font-bold mb-2">Red Flags:</Text>
                      {tipSection.redFlags.map((flag: string, fIdx: number) => (
                        <Text key={fIdx} className="text-red-300 text-sm mb-1">â€¢ {flag}</Text>
                      ))}
                    </View>
                  )}
                  
                  {tipSection.hashtags && tipSection.hashtags.map((tag: string, hIdx: number) => (
                    <Text key={hIdx} className="text-primary/80 text-sm mb-1">â€¢ {tag}</Text>
                  ))}
                </View>
              ))}

              {platform.channels?.map((channel: any, cIdx: number) => (
                <View key={cIdx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                  <Text className="text-white font-bold">{channel.name}</Text>
                  <Text className="text-zinc-400 text-sm mt-1">{channel.focus}</Text>
                  <Text className="text-primary/80 text-sm mt-2">â†’ {channel.why}</Text>
                </View>
              ))}

              {platform.sites?.map((site: any, sIdx: number) => (
                <View key={sIdx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                  <Text className="text-white font-bold mb-1">{site.name}</Text>
                  <Text className="text-zinc-400 text-xs mb-2">{site.url}</Text>
                  <Text className="text-zinc-300 text-sm mb-2">{site.focus}</Text>
                  <View className="flex-row gap-4">
                    <Text className="text-primary text-sm">âœ“ {site.pros}</Text>
                    <Text className="text-red-400 text-sm">âœ— {site.cons}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}

          {selectedSection === 'local' && currentSection.options?.map((option: any, idx: number) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <View className="flex-row items-center mb-4">
                <Ionicons name={option.icon} size={28} color="#9D12DE" />
                <Text className="text-primary text-xl font-bold ml-3">{option.option}</Text>
              </View>

              {option.benefits && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary font-bold mb-2">Benefits:</Text>
                  {option.benefits.map((benefit: string, bIdx: number) => (
                    <Text key={bIdx} className="text-primary/80 text-sm mb-1">â€¢ {benefit}</Text>
                  ))}
                </View>
              )}

              {option.howToFind && (
                <View className="mb-4">
                  <Text className="text-white font-bold mb-2">How to Find:</Text>
                  {option.howToFind.map((how: string, hIdx: number) => (
                    <Text key={hIdx} className="text-zinc-300 text-sm mb-1">â€¢ {how}</Text>
                  ))}
                </View>
              )}

              {option.whyAttend && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary/80 font-bold mb-2">Why Attend:</Text>
                  {option.whyAttend.map((why: string, wIdx: number) => (
                    <Text key={wIdx} className="text-primary/60 text-sm mb-1">â€¢ {why}</Text>
                  ))}
                </View>
              )}

              {option.types && (
                <View className="mb-4">
                  <Text className="text-white font-bold mb-2">Types:</Text>
                  {option.types.map((type: string, tIdx: number) => (
                    <Text key={tIdx} className="text-zinc-300 text-sm mb-1">â€¢ {type}</Text>
                  ))}
                </View>
              )}

              {option.cost && (
                <Text className="text-amber-400 text-sm mb-2">ðŸ’° {option.cost}</Text>
              )}
              
              {option.worth && (
                <Text className="text-primary text-sm">âœ“ {option.worth}</Text>
              )}
              
              {option.typical && (
                <Text className="text-zinc-400 text-sm italic">{option.typical}</Text>
              )}
              
              {option.frequency && (
                <Text className="text-primary/80 text-sm mt-2">â†’ {option.frequency}</Text>
              )}
            </View>
          ))}

          {selectedSection === 'culture' && currentSection.aspects?.map((aspect: any, idx: number) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-purple-400 text-xl font-bold mb-2">{aspect.aspect}</Text>
              <Text className="text-zinc-300 mb-4">{aspect.explanation}</Text>

              {aspect.examples && (
                <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4">
                  <Text className="text-purple-400 font-bold mb-2">Examples:</Text>
                  {aspect.examples.map((ex: string, eIdx: number) => (
                    <Text key={eIdx} className="text-purple-300 text-sm mb-1">â€¢ {ex}</Text>
                  ))}
                </View>
              )}

              {aspect.values && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary font-bold mb-2">Valued:</Text>
                  {aspect.values.map((value: string, vIdx: number) => (
                    <Text key={vIdx} className="text-primary/80 text-sm mb-1">âœ“ {value}</Text>
                  ))}
                </View>
              )}

              {aspect.celebrated && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary font-bold mb-2">Celebrated:</Text>
                  {aspect.celebrated.map((item: string, cIdx: number) => (
                    <Text key={cIdx} className="text-primary/80 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>
              )}

              {aspect.progress && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary/80 font-bold mb-2">Progress:</Text>
                  {aspect.progress.map((item: string, pIdx: number) => (
                    <Text key={pIdx} className="text-primary/60 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>
              )}

              {aspect.avoid && (
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <Text className="text-red-400 font-bold mb-2">Avoid:</Text>
                  {aspect.avoid.map((item: string, aIdx: number) => (
                    <Text key={aIdx} className="text-red-300 text-sm mb-1">âœ— {item}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}

          {selectedSection === 'contributing' && currentSection.ways?.map((way: any, idx: number) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-red-400 text-xl font-bold mb-4">{way.way}</Text>

              {way.roles && (
                <View className="mb-4">
                  <Text className="text-white font-bold mb-2">Roles:</Text>
                  {way.roles.map((role: string, rIdx: number) => (
                    <Text key={rIdx} className="text-zinc-300 text-sm mb-1">â€¢ {role}</Text>
                  ))}
                </View>
              )}

              {way.benefits && (
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-4">
                  <Text className="text-red-400 font-bold mb-2">Benefits:</Text>
                  {way.benefits.map((benefit: string, bIdx: number) => (
                    <Text key={bIdx} className="text-red-300 text-sm mb-1">â€¢ {benefit}</Text>
                  ))}
                </View>
              )}

              {way.types && (
                <View className="mb-4">
                  <Text className="text-white font-bold mb-2">Content Types:</Text>
                  {way.types.map((type: string, tIdx: number) => (
                    <Text key={tIdx} className="text-zinc-300 text-sm mb-1">â€¢ {type}</Text>
                  ))}
                </View>
              )}

              {way.actions && way.actions.map((action: string, aIdx: number) => (
                <Text key={aIdx} className="text-zinc-300 text-sm mb-2">â€¢ {action}</Text>
              ))}
            </View>
          ))}

          {selectedSection === 'toxicity' && (
            <View>
              {currentSection.redFlags?.map((item: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-3">ðŸš© {item.flag}</Text>

                  <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-4">
                    <Text className="text-red-400 font-bold mb-2">Examples:</Text>
                    {item.examples.map((ex: string, eIdx: number) => (
                      <Text key={eIdx} className="text-red-300 text-sm mb-1">â€¢ {ex}</Text>
                    ))}
                  </View>

                  <Text className="text-zinc-300 mb-3">
                    <Text className="text-white font-bold">Reality: </Text>
                    {item.reality}
                  </Text>

                  <View className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
                    <Text className="text-amber-400 font-bold">âš ï¸ {item.avoid}</Text>
                  </View>
                </View>
              ))}

              <View className="bg-primary/10 rounded-xl p-5 border border-primary/30 mb-6">
                <Text className="text-primary text-lg font-bold mb-3">âœ“ Healthy Community Signs:</Text>
                {currentSection.healthySigns?.map((sign: string, idx: number) => (
                  <Text key={idx} className="text-primary/80 text-sm mb-2">â€¢ {sign}</Text>
                ))}
              </View>
            </View>
          )}

          <View className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-5 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold text-lg mb-3">Community Makes the Difference</Text>
            <Text className="text-purple-300 text-sm mb-2">
              â€¢ Powerlifting community is one of the best in fitness
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              â€¢ Find YOUR people - online and local
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              â€¢ Give back more than you take
            </Text>
            <Text className="text-purple-300 text-sm">
              â€¢ Be the community member you want to see
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


