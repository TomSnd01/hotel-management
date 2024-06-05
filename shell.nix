let
  pkgs = import <nixpkgs> { };

  libraries = with pkgs;[
  ];

  packages = with pkgs; [
   nodejs_22
  ];
in
pkgs.mkShell {
  buildInputs = packages;
}
