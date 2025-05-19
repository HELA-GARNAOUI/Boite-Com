'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Building2, Users, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">À propos de nous</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Nous sommes une agence digitale passionnée par l'innovation et l'excellence,
          dédiée à transformer votre vision en réalité numérique.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Notre Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Accompagner les entreprises dans leur transformation digitale en leur offrant
              des solutions innovantes et sur mesure qui répondent à leurs besoins spécifiques.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              Notre Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Devenir le partenaire de référence en matière de solutions digitales,
              reconnu pour notre expertise, notre innovation et notre engagement
              envers la réussite de nos clients.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Valeurs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Innovation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous repoussons constamment les limites de la technologie pour créer
                des solutions innovantes qui font la différence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Excellence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous visons l'excellence dans chaque projet, en nous assurant que
                nos solutions répondent aux plus hauts standards de qualité.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous croyons en la puissance de la collaboration et travaillons
                en étroite relation avec nos clients pour atteindre leurs objectifs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Notre Équipe</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
          Notre équipe est composée d'experts passionnés, chacun apportant son expertise
          unique pour créer des solutions digitales exceptionnelles.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Expertise Technique</CardTitle>
              <CardDescription>
                Développeurs, designers et architectes solutions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stratégie Digitale</CardTitle>
              <CardDescription>
                Consultants et experts en transformation digitale
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Client</CardTitle>
              <CardDescription>
                Équipe dédiée à votre satisfaction
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre projet ?</h2>
        <p className="text-muted-foreground mb-8">
          Contactez-nous dès aujourd'hui pour discuter de vos besoins
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/contact">Nous Contacter</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/services">Nos Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 