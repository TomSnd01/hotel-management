let
  pkgs = import <nixpkgs> { };

  libraries = with pkgs;[
  ];

  packages = with pkgs; [
   nodejs_21
  ];
in
pkgs.mkShell {
  buildInputs = packages;
}
